#==============================================================================
# Specific variables
#==============================================================================
# PKR_VAR_myvar environment variable is read by Packer to set myvar in Packer 
PKR_VAR_vm_name=PacketFence-ZEN
PKR_VAR_output_directory=results
PF_VERSION=$(CI_COMMIT_REF_NAME)
RESULT_DIR=$(PKR_VAR_output_directory)
VM_NAME=$(PKR_VAR_vm_name)

#==============================================================================
# Targets
#==============================================================================
.PHONY: zen
zen:
	PKR_VAR_vm_name=$(PKR_VAR_vm_name) \
	PKR_VAR_output_directory=$(PKR_VAR_output_directory) \
	packer build .
	PF_VERSION=$(PF_VERSION) \
	RESULT_DIR=$(RESULT_DIR) \
	VM_NAME=$(VM_NAME) \
	./build-ova-for-vmware.sh

.PHONY: clean
clean:
	rm -rf results/

.PHONY: zen-release
zen-release:
	make \
	PKR_VAR_pf_repo=packetfence \
	PKR_VAR_pf_package=packetfence \
	PKR_VAR_pf_branch=stable \
	zen

.PHONY: zen-devel
zen-devel:
	make \
	PKR_VAR_pf_repo=packetfence-devel \
	PKR_VAR_pf_package=packetfence \
	PKR_VAR_pf_branch=devel \
	zen \
