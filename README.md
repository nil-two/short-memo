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
git clone git://github.com/kusabashira/short-memo
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

### alternate method
You can also use a shell script to edit the message.<br/>
Copy the add_note.sh file to any folder of your choice. e.g., $HOME/bin/
```
# add it to PATH
export PATH=$PATH:$HOME/bin/

# make the script executable
chmox +x $HOME/bin/add_note.sh

# run from anywhere to add notes
add_note.sh "Enter the memo or note here"
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
