Runner Up Mobile
## Quick start

```bash
git clone https://github.com/StanislavMaslow/runner-up.git

cd runner-up-mobile
sudo yarn install
sudo expo start
scan qr code with installed ExpoGo app from Play/app store

```

Build
android:

```bash
expo build:android
```

ios:

```bash
expo build:ios
```

## Release notes v.0.1.0: 
FRONT-END
 * Created UI and functionality for HomeScreen;
    - created course card ui and populated it with data from created course;
		- created navigation after pressing event card to Course details screen;
		- Created UI and functionality for Select Sport screen;
		- Created UI and functionality for Add/Edit course (course Form);
        * Only creator can edit courses
		- Created UI and functionality for pick event date and time;
* Course Details Screen;
   - navigate to Edit course screen;
	 - delete course functionality;
	    * Only creator can delete courses
* Created Header component with "back" navigation;
* Profile Screen
  - Created UI, logout functionality and popolated screen with user name;
        
* Added pull to refresh functionality for Home Screen
* Added phone screen app icon
* Fixed keyboard functionality on iOS and some UI bugs
* Added splash screen
* Connected and set maps UI and functionality for Create Course Screen;
    - added ability to add start and end point from map on create course;
    - added ability to add waypoints for course route;
    - added ability to edit waypoints of created course route;

* Course Details Screen;
   - connected maps component that shows user real course route;

BACK-END
- Added new fields for course;
- improved login and delete crete course;
- deployed new version.
- added api for course geolocation;
- deployed new version.