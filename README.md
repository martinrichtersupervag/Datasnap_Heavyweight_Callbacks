Datasnap_Heavyweight_Callbacks
==============================

Datasnap REST Heavyweight Callbacks (aka HTTP Long pooling technique)

This is an experimental work to replace the Embarcadero RadStudioXE2 (C++/Delphi) Datasnap REST Heavyweight Callbacks provided functionality (the provided Javascript generated from the IDE had too much crap). You should only use this if you really understand how the DataSnap works (really low level kind of understanding)!

Also, this was based on some protocol reverse-engineering and so use it with caution! (I'll not be responsabile for any strange behaviour - don't use this in production!)


Some additional information on DataSnap can be found here: http://mathewdelong.wordpress.com/category/rad-studio/delphi/datasnap/


This file should be used on the UI webserver (PHP WebServer) that will act as a Proxy and communicate with a DataSnap REST service!

Mobile Device/Tablet Browser <-> UI WebServer + PHP-PROXY (here you should use this code) <-> DataSnap REST service.


License
=======
Copyright (C) 2012 Nelson Neves

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see http://www.gnu.org/licenses/agpl-3.0.html