.PHONY: zen
zen:
	packer build .

.PHONY: zen-devel
zen-devel:
	PFREPO=packetfence-devel \
	PFPACKAGE=packetfence \
	PFBRANCH=devel \
	packer build .
