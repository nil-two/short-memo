Short Memo
==========

Show short message on top bar.

https://extensions.gnome.org/extension/974/short-memo/

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

License
-------

GNOME Shell Extensions are distributed under the terms of the GNU General Public License,
version 2 or later. See the COPYING file for details.
Individual extensions may be licensed under different terms,
see each source file for details.

Author
------

kusabashira <kusabashira227@gmail.com>
