# -*- coding: utf-8 -*-
import os
from setuptools import setup, find_packages
from version import get_version

version = get_version()

setup(name='gs.content.js.loader',
    version=version,
    description="Dynamic JavaScript Loader Code for Zope.",
    long_description=open("README.txt").read() + "\n" +
                      open(os.path.join("docs", "HISTORY.txt")).read(),
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        "Environment :: Web Environment",
        "Framework :: Zope2",
        "Intended Audience :: Developers",
        'License :: OSI Approved :: Zope Public License',
        "Natural Language :: English",
        "Operating System :: POSIX :: Linux"
        "Programming Language :: JavaScript",
        "Topic :: Software Development :: Libraries :: Python Modules",
      ],
    keywords='javascript Loader async',
    author='Michael JasonSmith',
    author_email='mpj17@onlinegroups.net',
    url='http://groupserver.org/',
    license='ZPL 2.0',
    packages=find_packages(exclude=['ez_setup']),
    namespace_packages=['gs','gs.content','gs.content.js'],
    include_package_data=True,
    zip_safe=True,
    install_requires=[
        'setuptools',
    ],
    extras_require={'zope': ['zope.browserresource', ]},
    entry_points="""
    # -*- Entry points: -*-
    """,
)
