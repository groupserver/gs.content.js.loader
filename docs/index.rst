:mod:`gs.content.js.loader`
===========================
:Author: `Michael JasonSmith`_
:Contact: Michael JasonSmith <mpj17@onlinegroups.net>
:Date: 2016-01-25
:Organization: `GroupServer.org`_
:Copyright: This document is licensed under a
  `Creative Commons Attribution-Share Alike 4.0 International License`_
  by `OnlineGroups.net`_.

..  _Creative Commons Attribution-Share Alike 4.0 International License:
    http://creativecommons.org/licenses/by-sa/4.0/

Contents:

.. toctree::
   :maxdepth: 2

   api
   resource
   HISTORY

This module contains a :doc:`dynamic JavaScript module loader
<api>` as a Zope :doc:`resource`. It allows modules to be loaded
*from* *JavaScript*, rather than having the dependencies written
in HTML ``script`` elements. It is based on the ideas of others
(see Acknowledgements_ below), but it mainly differs from prior
work in that it keeps track of a **global** list of loaded
scripts. The reason for this is the odd way that GroupServer_ is
written.

The getScript_ function from jQuery performs a similar role to
the :doc:`loader <api>` presented here. Most people should use
``getScript`` as I am sure that it is better written and better
maintained.

Acknowledgements
================

The Loader code was based on two jQuery loaders, from `CSS Tricks`_ and
the blog by `Joel Varty`_. The code to load multiple modules was based on
the `Async Script Loader with Callback`_ from CSS Tricks.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

Resources
=========

- Documentation:
  http://groupserver.readthedocs.org/projects/gscontentjsloader
- Code repository:
  https://github.com/groupserver/gs.content.js.loader/
- Questions and comments to
  http://groupserver.org/groups/development/
- Report bugs at https://redmine.iopen.net/projects/groupserver/

.. _GroupServer: http://groupserver.org/
.. _GroupServer.org: http://groupserver.org/
.. _OnlineGroups.Net: https://onlinegroups.net
.. _Michael JasonSmith: http://groupserver.org/p/mpj17
.. _getScript: http://api.jquery.com/jQuery.getScript/
.. _jQuery: http://jquery.com/
.. _CSS Tricks: http://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
.. _Joel Varty: http://weblogs.asp.net/joelvarty/archive/2009/05/07/load-jquery-dynamically.aspx
.. _Async Script Loader with Callback: http://css-tricks.com/snippets/javascript/async-script-loader-with-callback/
