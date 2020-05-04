#!/bin/bash
set -o nounset -o pipefail -o errexit

RESULT_DIR=${RESULT_DIR:-.}
VM_NAME=${VM_NAME:-vm}

VBOX_OVA_NAME=${VM_NAME}.ova
VBOX_OVF_NAME=${VM_NAME}.ovf
VMX_DIR=${RESULT_DIR}/vmware
VMX_OVA_NAME=${VM_NAME}-${PF_VERSION}.ova

declare -p RESULT_DIR VM_NAME
declare -p VBOX_OVA_NAME VBOX_OVF_NAME
declare -p VMX_DIR VMX_OVA_NAME


generate_manifest() {
    local vmx_dir=${1}
    ( cd ${vmx_dir} ;
      sha1sum --tag ${VBOX_OVF_NAME} ${VM_NAME}-disk001.vmdk > ${VM_NAME}.mf
      )
}

mkdir -p ${VMX_DIR}

echo "===> Extract Virtualbox OVA to ${VMX_DIR}"
tar xvf ${RESULT_DIR}/${VBOX_OVA_NAME} -C ${VMX_DIR}

echo "===> Convert OVF in-place for VMware"
sed -i 's/<OperatingSystemSection ovf:id="80">/<OperatingSystemSection ovf:id="101">/' ${VMX_DIR}/${VBOX_OVF_NAME}
sed -i 's/<vssd:VirtualSystemType>virtualbox-2.2/<vssd:VirtualSystemType>vmx-07/' ${VMX_DIR}/${VBOX_OVF_NAME}

# Manifest need to be generate by hand because we modify OVF during last step
echo "===> Generate a manifest"
generate_manifest ${VMX_DIR}

echo "===> Generate OVA for VMware"
ovftool --lax ${VMX_DIR}/${VBOX_OVF_NAME} ${VMX_DIR}/${VMX_OVA_NAME}
