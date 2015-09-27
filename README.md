# eddie-timelapse
 1. Description 
 	This is a small weekend project that I worked on to create a time-lapse video
 	using an off the shelf LogiTech webcam and an Intel Edison board. The Intel 
 	Edison platform can trigger camera captures at regular intervals using cron 
 	linux utility - Once there is a capture, a nodejs or python program calls 
 	Temboo middleware APIs to upload them to Drop box. 

 2. Setup Notes 
 	For Temboo, you will need to install the temboo python or node js SDK on the 
 	Intel Edison.
 	SDK  Setup is pretty simple - Just download the SDK, and unzip it to a 
 	directory on the Intel Edison - 
 	You can download the SDK here - 
		nodejs - http://temboo.com/sdk/nodejs
		python - http://temboo.com/sdk/python
 	Once the SDK is copied over, clone the https://github.com/ghanashyamprabhu/eddie-timelapse
 	Either of the main.js or main.py can be used to trigger captures and calls to 
 	Temboo APIs to upload pictures to Dropbox. 

 3. Drop box and Temboo with OAuth 
    3.1 Create an App with Drop box 
        Go to https://www.dropbox.com/developers -> App Console -> Check Dropbox API app
        On creation of the app, it will show you the AppKey and AppSecret which you will need to 
        note down so that you can use it in the main() function to authenticate connection to 
        Dropbox through Temboo API calls

    3.2 Temboo 
        Follow the setup instructions to Authorize calls to Drop box via 
        https://temboo.com/library/Library/Dropbox/OAuth/
        Once the InitializeOAuth and FinalizeOAuth Choreos are completed, you will see the
        'callbackID' and 'OAuth token secret' that you can use in the main() function for 
        authentication. 
	     
 4. Cron Job  
  	To set the interval, we will use cron job. 
  	On Intel Edison platform, you can use a utility called cronie to do trigger 
  	execution of scripts at a regular interval. 

 	4.1 OPKG Install Cronie 
 	    Setup opkg repo - On Edison console, execute the following. 
 	    > echo "src all http://repo.opkg.net/edison/repo/all" >> /etc/opkg/base-feeds.conf
	    > echo "src edison http://repo.opkg.net/edison/repo/edison" >> /etc/opkg/base-feeds.conf
	    > echo "src core2-32 http://repo.opkg.net/edison/repo/core2-32" >> /etc/opkg/base-feeds.conf
 	    > opkg update
	    > opkg install cronie

 	4.2 Cronjob 
 	    Use the crontab to setup the job using the following command 
 	    > crontab -e
 	    This will open up an editor (possibly via vi) to add in the statement to call the script 
 	    I used the following contend mentioned between the quotes
	'*/10 * * * * /usr/bin/python /home/root/sw/temboo/temboo_python_sdk/main.py'

 	    For more information on the cron formatsi and examples, refer 
 	    https://wiki.archlinux.org/index.php/Cron#Examples

 5. Creating the video 
    I used avconv to create the video from the images that were uploaded to Dropbox. One of the i
    requirements would be to have a good numbering of the images while creating the image files
    I used the time of the hour to create the images, but that wasn't suiting avconv, so once I 
    downloaded all the images, I ran the following command which will name the files in an 
    incremental fashion, Run it in the directory where you have the files
    > ls -ltr | awk 'BEGIN{a=0}{printf "mv %s eddie_%04d.jpg\n", $0, a; a++}' | bash 

 You can now use avconv linux utility to convert these images into an mp4video
    > avconv -y -r 20 -i eddie_%04d.jpg -r 20 -q:v 3 timelapse.mp4  

