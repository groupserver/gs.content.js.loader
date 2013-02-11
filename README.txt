Introduction
============

This module contains a dynamic JavaScript loader_. It allows modules to be
loaded *from* *JavaScript*, rather than having the dependencies written in
HTML ``script`` elements. It is based on the ideas of others (see
Acknowledgements_ below), but it mainly differs from prior work in that it
keeps track of a **global** list of loaded scripts.

While originally written for GroupServer_, there is nothing specific to
GroupServer in this product.

Loader
======

There are two forms of the loader: the `single resource`_ loader and the
`multiple resource`_ loader.

Single Resource
---------------

**Example**::

    gsJsLoader.with_module('/++resource++gs-search-base-js-20121217.js', 
                            init_topic_search);

Multiple Resource
-----------------

**TODO**

**Example**::

  gsJsLoader.with_modules(['/foo.js', '/bar.js'], my_code);

Acknowledgements
================

The `single resource`_ code was based on two jQuery loaders, from `CSS
Tricks`_ and the blog by `Joel Varty`_. The `multiple resource`_ code was based on the `Async Script Loader with
Callback`_ from CSS Tricks.

.. _CSS Tricks: http://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
.. _Joel Varty: http://weblogs.asp.net/joelvarty/archive/2009/05/07/load-jquery-dynamically.aspx
.. _Async Script Loader with Callback: http://css-tricks.com/snippets/javascript/async-script-loader-with-callback/

Resources
=========

- Code repository: https://source.iopen.net/groupserver/gs.content.js.loader/
- Questions and comments to http://groupserver.org/groups/development/
- Report bugs at https://redmine.iopen.net/projects/groupserver/

.. _GroupServer: http://groupserver.org/

..  LocalWords:  jQuery UI Plone
