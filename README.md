Datasnap_Heavyweight_Callbacks
==============================

Datasnap REST Heavyweight Callbacks (aka HTTP Long pooling technique)

This is an experimental work to replace the Embarcadero RadStudioXE2 (C++/Delphi) Datasnap REST Heavyweight Callbacks provided functionality (the provided Javascript generated from the IDE had too much crap). You should only use this if you really understand how the DataSnap works (really low level kind of understanding)!

Also, this was based on some protocol reverse-engineering and so use it with caution! (I'll not be responsabile for any strange behaviour - don't use this in production!)


Some additional information on DataSnap can be found here: http://mathewdelong.wordpress.com/category/rad-studio/delphi/datasnap/


This file should be used on the UI webserver (PHP WebServer) that will act as a Proxy and communicate with a DataSnap REST service!

Mobile Device/Tablet WebBased UI <-> PHP-PROXY (here you should use this code) <-> DataSnap REST service.