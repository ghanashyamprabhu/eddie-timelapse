import sys
import os
import base64 
import time

from temboo.core.session import TembooSession
from temboo.Library.Dropbox.FilesAndMetadata import UploadFile

shoot = os.system("fswebcam -r 1280x720 --no-underlay --jpeg 95 /home/root/sw/temboo/temboo_python_sdk_2.13.0/test.jpeg")
mydate = (time.strftime("%H_%M_%S"))

#'''with open(str(sys.argv[1]), "rb") as image_file:
with open('/home/root/sw/temboo/temboo_python_sdk_2.13.0/test.jpeg',"rb") as image_file:
	encoded_string = base64.b64encode(image_file.read())

session = TembooSession('ghanashyamprabhu', 'myFirstApp', 'f8a13860d91748b69ab01dbe54e5bc8c')

uploadFileChoreo = UploadFile(session)
uploadFileInputs = uploadFileChoreo.new_input_set()

uploadFileInputs.set_AppSecret("rt4m3r9ibd40h8u")
uploadFileInputs.set_AccessToken("7gh3wryzt3xn8k8f")
uploadFileInputs.set_FileName('eddie_'+mydate+'.jpeg')
uploadFileInputs.set_AccessTokenSecret("n6vnpxt1dce0umn")
uploadFileInputs.set_AppKey("o8bo3ym3rl3gfb2")
uploadFileInputs.set_FileContents(encoded_string)
uploadFileInputs.set_Root("sandbox")

uploadFileResults = uploadFileChoreo.execute_with_results(uploadFileInputs)
