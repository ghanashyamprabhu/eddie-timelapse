// You'll need a single TembooSession object in your code, eg:
// Create a temboo session
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("ghanashyamprabhu", "myFirstApp", "f8a13860d91748b69ab01dbe54e5bc8c");

//Create a drop box upload 
var Dropbox = require("temboo/Library/Dropbox/OAuth");
var initializeOAuthChoreo = new Dropbox.InitializeOAuth(session);

// upload sessions
var dboxlink = require("temboo/Library/Dropbox/FilesAndMetadata");

var Utilities = require("temboo/Library/Utilities/Encoding");
// base64 image encode packages
var fs = require("fs");
var img_data = fs.readFileSync("./eddie.jpeg");
var img_data_base64 = Buffer(img_data).toString('base64');

var uploadFileChoreo = new dboxlink.UploadFile(session);
var uploadFileInputs = uploadFileChoreo.newInputSet();

// Set inputs 
uploadFileInputs.set_AccessToken("7gh3wryzt3xn8k8f");
uploadFileInputs.set_AppSecret("rt4m3r9ibd40h8u");
uploadFileInputs.set_FileContents(img_data_base64);
uploadFileInputs.set_FileName("photo.png");
uploadFileInputs.set_AccessTokenSecret("n6vnpxt1dce0umn");
uploadFileInputs.set_AppKey("o8bo3ym3rl3gfb2");
uploadFileInputs.set_Root("sandbox");

// Instantiate and populate the input set for the choreo
var initializeOAuthInputs = initializeOAuthChoreo.newInputSet();

// Set inputs
initializeOAuthInputs.set_DropboxAppSecret("rt4m3r9ibd40h8u");
initializeOAuthInputs.set_DropboxAppKey("o8bo3ym3rl3gfb2");

// Run the choreo, specifying success and error callback handlers
initializeOAuthChoreo.execute(
    initializeOAuthInputs,
    function(results){console.log(results.get_AuthorizationURL());},
    function(error){console.log(error.type); console.log(error.message);}
);

// Run the choreo, specifying success and error callback handlers
uploadFileChoreo.execute(
    uploadFileInputs,
    function(results){console.log(results.get_Response());},
    function(error){console.log(error.type); console.log(error.message);}
);
