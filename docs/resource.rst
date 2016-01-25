Resource
========

This product provides a JavaScript module as a Zope_ `browser
resource`_. Any Zope or Plone_ project should be able to use this
product as-is by placing the following line in a page template:

.. code-block:: xml

    <script type="text/javascript"
            src="/++resource++gs-content-js-loader-20160125.js"> </script>

A minified version of the module is also provided:

.. code-block:: xml

    <script type="text/javascript"
            src="/++resource++gs-content-js-loader-20160125.js"> </script>

Users of other systems are invited to copy the file
``gs/content/js/loader/browser/javascript/loader.js`` out of this
product.

.. _Zope: http://zope.org/
.. _browser resource: http://docs.zope.org/zope.browserresource/
.. _Plone: http://plone.org
