Introduction
============

This module contains a dynamic JavaScript module loader_ as a Zope
resource_. It allows modules to be loaded *from* *JavaScript*, rather than
having the dependencies written in HTML ``script`` elements. It is based on
the ideas of others (see Acknowledgements_ below), but it mainly differs
from prior work in that it keeps track of a **global** list of loaded
scripts. The reason for this is the odd way that GroupServer_ is written.

In GroupServer a page may be made up of multiple components, called
*viewlets,* that are quite separate from each other. A common pattern is
for some viewlets to inject some JavaScript code into the bottom of the
page. Each viewlet is usually unaware of what modules have been loaded by
the other viewlets; the global tracking of loaded modules, provided
here, prevents modules from being loaded and parsed unnecessarily. While
originally written for GroupServer, there is nothing specific to
GroupServer in this product.

Finally, the getScript_ function from jQuery performs a similar role to the
loader_ presented here. Most people should use ``getScript`` as I am sure
that it is better written and better maintained.

Loader
======

The `with_module`_ method of the ``gsJsLoader`` object loads one or more
resources and runs a function afterwards. The global ``gsJsLoader`` object
keeps track of what is loaded. Introspection is provided by the loaded_,
loading_ and exists_ methods.

``with_module``
---------------

*With* some *modules* run a *function.*

Synopsis
~~~~~~~~

::

  gsJsLoader.with_module(URL | [URL₁, URL₂… URLₙ], function);

Arguments
~~~~~~~~~

``url``:
  The URL of the module you wish to load. If a *list* of URLs is supplied
  each module is loaded *in sequence*.

``function``:
  The function to execute after the module has loaded. (The code that
  depends on the module.) If a *list* of URLs is supplied as the first
  argument then the function is executed after all the modules have been
  loaded.

Returns
~~~~~~~

Nothing.

Side Effects
~~~~~~~~~~~~

* If the module has not been loaded and not been requested:

  + Inserts ``<script>`` elements into the ``<head>`` of the document, to
    cause the module or modules specified in ``url`` to load.

  + Connects the ``function`` to the ``load`` (or ``onload`` for older
    versions of Internet Explorer) callback of the ``<script>``.

* If the module has been requested, but has not been loaded:

  + Connects the ``function`` to the ``load`` callback of the ``<script>``.

* If the module has been loaded:

  + Calls the ``function``.

Examples
~~~~~~~~

Run the function ``init_topic_search`` with the base search code::

    gsJsLoader.with_module('/++resource++gs-search-base-js-20121217.js', 
                           init_topic_search);

Load two modules, jQuery_ and then Bootstrap_. Execute the function
``my_code`` after both modules have been loaded.::

  gsJsLoader.with_module(['/++resource++jquery-1.8.3.js', 
                          '/++resource++bootstrap-2.2.2/js/bootstrap.js'], 
                         my_code);

Wait for the window to load, then initialise the post searching
code. Detect and support loading if we are using a version of Microsoft
Internet Explorer that does not support the standard ``addEventListener``
method::

  if (window.addEventListener) {
      window.addEventListener('load', function () {
          gsJsLoader.with_module('/++resource++gs-search-base-js-20121217.js',
                                 init_post_search);
      }, false);
  
  } else {
      window.attachEvent('onload', function () {
          gsJsLoader.with_module('/++resource++gs-search-base-js-20121217.js',
                                 init_post_search);
      });
  }

The same call as above, but using jQuery to attach to the ``load`` event::

  jQuery(window).load(function () {
            gsJsLoader.with_module('/++resource++gs-search-base-js-20121217.js',
                                   init_post_search);
   });

(This module is devoid of jQuery code, so it can be used to *load* jQuery.)

``loaded``
----------

Test if a module has been loaded (past-tense).

Synopsis
~~~~~~~~

::

  gsJsLoader.loaded(URL);

Arguments
~~~~~~~~~

``url``:
  The URL of the module to test.

Returns
~~~~~~~

A Boolean: ``true`` if the module has been loaded; ``false`` if the
module has is *being* loaded or has not been requested.

Side Effects
~~~~~~~~~~~~

None.

``loading``
------------

Test if a module is being loaded (present continuous tense).

Synopsis
~~~~~~~~

::

  gsJsLoader.loading(URL);

Arguments
~~~~~~~~~

``url``:
  The URL of the module to test.

Returns
~~~~~~~

A Boolean: ``true`` if the module is being loaded; ``false`` if the
module has *been* loaded or has not been requested.

Side Effects
~~~~~~~~~~~~

None.

``exists``
----------

Test if a module is known.

Synopsis
~~~~~~~~

::

  gsJsLoader.known(URL);

Arguments
~~~~~~~~~

``url``:
  The URL of the module to test.

Returns
~~~~~~~

A Boolean: ``true`` if the module has being loaded or has been requested;
``false`` otherwise.

Side Effects
~~~~~~~~~~~~

None.

Resource
========

This product provides a JavaScript module as a Zope_ `browser
resource`_. Any Zope or Plone_ project should be able to use this product
as-is by placing the following line in a page template::

    <script type="text/javascript" 
            src="/++resource++gs-content-js-loader-20130111.js"> </script>

Users of other systems are invited to copy the file
``gs/content/js/loader/browser/javascript/loader.js`` out of this product.

A minified version of the module is also provided::

    <script type="text/javascript" 
            src="/++resource++gs-content-js-loader-20130111.js"> </script>


Acknowledgements
================

The Loader_ code was based on two jQuery loaders, from `CSS Tricks`_ and
the blog by `Joel Varty`_. The code to load multiple modules was based on
the `Async Script Loader with Callback`_ from CSS Tricks.

Resources
=========

- Code repository: https://source.iopen.net/groupserver/gs.content.js.loader/
- Questions and comments to http://groupserver.org/groups/development/
- Report bugs at https://redmine.iopen.net/projects/groupserver/

.. _GroupServer: http://groupserver.org/
.. _getScript: http://api.jquery.com/jQuery.getScript/
.. _Zope: http://zope.org/
.. _browser resource: http://docs.zope.org/zope.browserresource/
.. _Plone: http://plone.org
.. _jQuery: http://jquery.com/
.. _Bootstrap: http://twitter.github.com/bootstrap/
.. _CSS Tricks: http://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
.. _Joel Varty: http://weblogs.asp.net/joelvarty/archive/2009/05/07/load-jquery-dynamically.aspx
.. _Async Script Loader with Callback: http://css-tricks.com/snippets/javascript/async-script-loader-with-callback/


..  LocalWords:  jQuery UI Plone minified
