.PHONY: all create-release updete-schemas
all:

create-release:
	zip -r Short_Memo.zip ./ -x \
		'*.git*' 'README.md' 'COPYING' 'Makefile'

updete-schemas:
	glib-compile-schemas schemas
