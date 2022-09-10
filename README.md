Short Memo
==========

Show short message on top bar.

https://extensions.gnome.org/extension/974/short-memo/

Installation
------------

#### from GNOME Shell Extensions

See [extension](https://extensions.gnome.org/extension/974/short-memo/)

#### from command line

```
git clone git://github.com/nil-two/short-memo
cd short-memo
make install-extension
```

Tips
----

#### modifying the message

You can modify the message by using dconf. as follows:

```
# change the message to "Warning"
dconf write /org/gnome/shell/extensions/short-memo/message '"Warning"'

# change the message to "(つ´∀｀)つ"
dconf write /org/gnome/shell/extensions/short-memo/message '"(つ´∀｀)つ"'
```

See also
--------

- [https://github.com/rhasnainanwar/short-memo](https://github.com/rhasnainanwar/short-memo)
  - There is a script to change the message from CLI.

License
-------

GNOME Shell Extensions are distributed under the terms of the GNU General Public License,
version 2 or later. See the COPYING file for details.
Individual extensions may be licensed under different terms,
see each source file for details.

Author
------

nil2 <nil2@nil2.org>
