#!/bin/bash
set -o nounset -o pipefail -o errexit

RESULT_DIR=${RESULT_DIR:-.}
VM_NAME=${VM_NAME:-vm}

VBOX_OVA_NAME=${VM_NAME}.ova
VBOX_OVF_NAME=${VM_NAME}.ovf
VMX_OVA_NAME=${VM_NAME}-${PF_VERSION}.ova

declare -p RESULT_DIR VM_NAME
declare -p VBOX_OVA_NAME VBOX_OVF_NAME
declare -p VMX_OVA_NAME

echo "Extract Virtualbox OVA to ${RESULT_DIR}"
tar xvf ${RESULT_DIR}/${VBOX_OVA_NAME} -C ${RESULT_DIR}

echo "Convert OVF in-place for VMware"
sed -i 's/<OperatingSystemSection ovf:id="80">/<OperatingSystemSection ovf:id="101">/' ${RESULT_DIR}/${VBOX_OVF_NAME}
sed -i 's/<vssd:VirtualSystemType>virtualbox-2.2/<vssd:VirtualSystemType>vmx-07/' ${RESULT_DIR}/${VBOX_OVF_NAME}

echo "Generate OVA for VMware"
ovftool --lax ${RESULT_DIR}/${VBOX_OVF_NAME} ${RESULT_DIR}/${VMX_OVA_NAME}
