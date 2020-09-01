import '@babel/polyfill'
import { login, logout } from './login';
import { updateData,deleteMe } from './updateUser';
import { manageAdmin } from './manageAdmins';
import { signup } from './signup';
import { updateHomePage } from './updateUserHomePage';
import { createEvent } from './createEvent';
import { updateHomePhoto } from './updateHomePhoto';
import { addSpecificEventPhoto } from './addSpecificEventPhoto';
import { deleteSpecificEventPhoto } from './deleteSpecificEventPhoto';
import { addSpecificEvent } from './addSpecificEvent';
import { deleteSpecificEvent } from './deleteSpecificEvent';
import { deleteEvent } from './deleteEvent';
import { updateAboutPage } from './updateAboutPage';
import { deleteUser } from './deleteUser';
import { updateRushPage } from './updateRushPage';
import { updateRushPhoto } from './updateRushPhoto';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logout');
const userDataForm = document.querySelector('.form-user-data');
const userPassForm = document.querySelector('.form-updatePass');
const signupForm = document.querySelector('.sign-up');
const updateHomePageForm = document.querySelector('.edit-home-page');
const addEventForm = document.querySelector('.add-event');
const addSpecificEventForm = document.querySelector('.add-specific-event');

const updateRushPageForm = document.querySelector('.edit-rush-page');



const applyBtn = document.querySelector('.applyForAdmin');
const selectUserOneBtn = document.querySelectorAll('.selectUserOneBtn');
const selectUserTwoBtn = document.querySelectorAll('.selectUserTwoBtn');

const selectUserThreeBtn = document.querySelectorAll('.selectUserThreeBtn');
const selectUserFourBtn = document.querySelectorAll('.selectUserFourBtn');
const selectUserFiveBtn = document.querySelectorAll('.selectUserFiveBtn');
const selectUserSixBtn = document.querySelectorAll('.selectUserSixBtn');
const selectUserSevenBtn = document.querySelectorAll('.selectUserSevenBtn');
const selectUserEightBtn = document.querySelectorAll('.selectUserEightBtn');

//LOGIN AND LOGOUT
if(loginForm)
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email,password);
    });

if (logOutBtn) logOutBtn.addEventListener('click', e=> {
    e.preventDefault();
    logout()
});


//UPDATE USER DATA
if(userDataForm)
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        if(document.getElementById('photo').files[0] != undefined) {
            form.append('photo', document.getElementById('photo').files[0]);
        }
        form.append('firstname', document.getElementById('firstname').value);
        form.append('lastname', document.getElementById('lastname').value);
        form.append('email', document.getElementById('email').value);
        form.append('major', document.getElementById('major').value);
        form.append('year', document.getElementById('year').value);
        form.append('favoritePhrase', document.getElementById('favphrase').value);
        form.append('pledgeClass', document.getElementById('pledgeclass').value);
        form.append('pin', document.getElementById('pin').value);
        //console.log(form);
        updateData(form, 'data');
    });

if(userPassForm)
    userPassForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.save-password').textContent = 'Updating...'

        const passwordCurrent = document.getElementById('currentPass').value;
        const newPassword = document.getElementById('newPass').value;
        const passwordConfirm = document.getElementById('newPassConfirm').value;
        await updateData({passwordCurrent, newPassword, passwordConfirm}, 'password');

        document.querySelector('.save-password').textContent = 'Submit'
        document.getElementById('currentPass').value ='';
        document.getElementById('newPass').value='';
        document.getElementById('newPassConfirm').value='';
    });

//CREATE ACCOUNT
if(signupForm)
    signupForm.addEventListener('submit', async e => {
        e.preventDefault();
        const firstname= document.getElementById('firstname').value;
        const lastname= document.getElementById('lastname').value;
        const email=document.getElementById('email').value;
        const major= document.getElementById('major').value;
        const year= document.getElementById('year').value;
        const favoritePhrase= document.getElementById('favoritePhrase').value;
        const pledgeClass=document.getElementById('pledgeclass').value;
        const pin=document.getElementById('pin').value;
        const password= document.getElementById('password').value;
        const passwordConfirm= document.getElementById('passwordConfirm').value;

        signup({firstname,lastname,email,major,year,favoritePhrase,pledgeClass,pin,password,passwordConfirm});
    });




if(applyBtn)
    applyBtn.addEventListener('click', async e => {
        e.preventDefault();
        const id = document.getElementById('apply').value;
        const applyForAdmin = true;
        updateData({applyForAdmin}, 'apply for admin');
        window.setTimeout(()=> {
            location.assign('/me');
        },1000);
    });








const addSpecificEventPhotosForm = document.querySelector('.add-specific-event-photos');
if(addSpecificEventPhotosForm)
    addSpecificEventPhotosForm.addEventListener('submit', e=> {
        const specificEventId = document.getElementById('specificEventId').value;
        const fileInputAddSpecificEventPhoto = document.getElementById('addSpecificEventPhotos');
        for(var x=0; x<fileInputAddSpecificEventPhoto.files.length; x++)
        {
            let form = new FormData();
            form.append('name', fileInputAddSpecificEventPhoto.files[x]);
            addSpecificEventPhoto(form, specificEventId);
        }
    });

const fileInputAddSpecificEventPhoto = document.getElementById('addSpecificEventPhotos');
if(fileInputAddSpecificEventPhoto)
    fileInputAddSpecificEventPhoto.addEventListener('change', function() {   
        if(this.files.length>0) {
            for(var i=0; i<this.files.length; i++) {
                
                var reader = new FileReader();
                reader.addEventListener('load', function() {
                    var div = document.createElement('div');
                    div.className = 'col-3';
                    var img = document.createElement('img');
                    img.className = 'img-thumbnail';
                    img.src = this.result;
                    div.appendChild(img);
                    document.getElementById('image-preview').appendChild(div);

                });
                reader.readAsDataURL(this.files[i]);
            }
        }
        
    });

//DELETE SPECIFIC EVENT PHOTO
const deleteSpecificEventPhotoBtn = document.querySelectorAll('.removeSpecificEventPhoto');
for(var i=0; i<deleteSpecificEventPhotoBtn.length; i++)
{
    let specificEventPhotoId = document.getElementById(`specificEventPhotoId${i}`).value;
    deleteSpecificEventPhotoBtn[i].addEventListener('click', function() {
        deleteSpecificEventPhoto(specificEventPhotoId);
    });
}


const coverPhoto = document.getElementById('coverPhoto');
const coverPhotoPreview = document.querySelector('.coverPhotoPreview')
if (coverPhoto)
    coverPhoto.addEventListener('change', function() {
        const file = this.files[0];
        if(file) {
            const reader = new FileReader();

            reader.addEventListener('load', function() {
                coverPhotoPreview.setAttribute('src', this.result);
            });

            reader.readAsDataURL(file);
        }
    });



if(addSpecificEventForm)
    addSpecificEventForm.addEventListener('submit', e=> {
        e.preventDefault();
        const eventID = document.getElementById('eventID').value;
        const form = new FormData();
        form.append('coverPhoto', document.getElementById('coverPhoto').files[0]);
        form.append('title', document.getElementById('title').value);
        form.append('caption', document.getElementById('caption').value);
        form.append('year', document.getElementById('year').value);
        form.append('semester', document.getElementById('semester').value);
        addSpecificEvent(form,eventID);
    })

const deleteSpecificEventBtn = document.querySelectorAll('.delete-specific-event-button');
for(var i=0; i<deleteSpecificEventBtn.length; i++) {
    let specificEventId = document.getElementById(`specificEvent${i}`).value;
    deleteSpecificEventBtn[i].addEventListener('click', function() {
        deleteSpecificEvent(specificEventId);
    });
}

const deleteEventBtn = document.querySelectorAll('.delete-Event');
for(var i=0; i<deleteEventBtn.length; i++)
{
    let eventId = document.getElementById(`event${i}`).value;
    deleteEventBtn[i].addEventListener('click', function() {
        deleteEvent(eventId);
    });
}











//EDIT HOME PAGE BELOW

//INJECT FILES INTO IMG CONTAINER FOR HOME PAGE
const imageOne = document.querySelector('.imageOne');
const photoInptOne = document.getElementById('photoOne');
const imageTwo = document.querySelector('.imageTwo');
const photoInptTwo = document.getElementById('photoTwo');
const imageThree = document.querySelector('.imageThree');
const photoInptThree = document.getElementById('photoThree');
//PREVIEW FIRST PHOTO
if(photoInptOne)
    photoInptOne.addEventListener('change', function() {
        const file = this.files[0];

        if(file) {
            const reader = new FileReader();

            reader.addEventListener('load', function() {
                imageOne.setAttribute('src', this.result);
            });

            reader.readAsDataURL(file);
        }
    });
//PREVIEW SECOND PHOTO
if(photoInptTwo)
    photoInptTwo.addEventListener('change', function() {
        const file = this.files[0];

        if(file) {
            const reader = new FileReader();

            reader.addEventListener('load', function() {
                imageTwo.setAttribute('src', this.result);
            });

            reader.readAsDataURL(file);
        }
    });
//PREVIEW THIRD PHOTO
if(photoInptThree)
    photoInptThree.addEventListener('change', function() {
        const file = this.files[0];

        if(file) {
            const reader = new FileReader();

            reader.addEventListener('load', function() {
                imageThree.setAttribute('src', this.result);
            });

            reader.readAsDataURL(file);
        }
    });




//CREATE EVENT
if(addEventForm)
    addEventForm.addEventListener('submit', async e => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', document.getElementById('title').value);
        form.append('caption', document.getElementById('caption').value);
        form.append('semester', document.getElementById('semester').value);
        form.append('coverPhoto', document.getElementById('photoOne').files[0]);
        createEvent(form);
    });

var nameDisplayOne = document.getElementById('nameDisplayOne');
var majorDisplayOne = document.getElementById('majorDisplayOne');
var yearDisplayOne = document.getElementById('yearDisplayOne');
var phraseDisplayOne = document.getElementById('favphraseDisplayOne');
var imageDisplayOne = document.querySelector('.imgDisplayOne');

var userOneId; //Value that determines which user is changed when form is submitted
for(var i=0; i<selectUserOneBtn.length; i++) {
    let userOne = document.getElementById(`userOne${i}`).value; //User ID assigned to that button area
    let userOneImg = document.getElementById(`userOneImg${i}`).value; //User Image value

    let userOneName = document.getElementById(`userOneName${i}`).textContent; //User First and Last name
    let userOneMajor = document.getElementById(`userOneMajor${i}`).textContent; //User major
    let userOneYear = document.getElementById(`userOneYear${i}`).textContent; //User year
    let userOneFavPhrase = document.getElementById(`userOneFavPhrase${i}`).textContent; //User phrase

    selectUserOneBtn[i].addEventListener('click',function() {
        userOneId=userOne; //Sets value of user that is clicked then is called in submit function

        nameDisplayOne.innerHTML = userOneName;
        majorDisplayOne.innerHTML = userOneMajor;
        yearDisplayOne.innerHTML = userOneYear;
        phraseDisplayOne.innerHTML = userOneFavPhrase;
        imageDisplayOne.setAttribute('src', `/img/users/${userOneImg}`);
    });
};

var nameDisplayTwo = document.getElementById('nameDisplayTwo');
var majorDisplayTwo = document.getElementById('majorDisplayTwo');
var yearDisplayTwo = document.getElementById('yearDisplayTwo');
var phraseDisplayTwo = document.getElementById('favphraseDisplayTwo');
var imageDisplayTwo = document.querySelector('.imgDisplayTwo');

var userTwoId; //value that determines which user is changed when form is submitted
for(var i=0; i<selectUserTwoBtn.length; i++) {
    let userTwo = document.getElementById(`userTwo${i}`).value; //User Id is assigned to that button area
    let userTwoImg = document.getElementById(`userTwoImg${i}`).value;

    let userTwoName = document.getElementById(`userTwoName${i}`).textContent;
    let userTwoMajor = document.getElementById(`userTwoMajor${i}`).textContent;
    let userTwoYear = document.getElementById(`userTwoYear${i}`).textContent;
    let userTwoFavPhrase = document.getElementById(`userTwoFavPhrase${i}`).textContent;

    selectUserTwoBtn[i].addEventListener('click', function(){
        userTwoId=userTwo;

        nameDisplayTwo.innerHTML = userTwoName;
        majorDisplayTwo.innerHTML = userTwoMajor;
        yearDisplayTwo.innerHTML = userTwoYear;
        phraseDisplayTwo.innerHTML = userTwoFavPhrase;
        imageDisplayTwo.setAttribute('src', `/img/users/${userTwoImg}`);
    });
};


const promoteBtn = document.querySelectorAll('.promoteAdmin');
const denyBtn = document.querySelectorAll('.denyAdmin');
//ADMIN FUNCTIONS NEED WORK
for(var i=0; i<denyBtn.length; i++) {
    let name = document.getElementById(`nameUser${i}`).value;
    let id = document.getElementById(`user${i}`).value;
    let applyForAdmin = false;
    denyBtn[i].addEventListener('click', function (){
        manageAdmin(id, {applyForAdmin}, `User: ${name} has been denied admin permissions`, 'warning');
        window.setTimeout(()=> {
            location.assign('/adminpage');
        },1000);
    });
};

for(var i=0; i<promoteBtn.length; i++) {
    let name = document.getElementById(`nameUser${i}`).value;
    let id = document.getElementById(`user${i}`).value;
    let role = 'admin';
    let applyForAdmin = false;
    promoteBtn[i].addEventListener('click', function(){
        manageAdmin(id, {role, applyForAdmin}, `User: ${name} has been granted admin permissions`, 'success');
        window.setTimeout(()=> {
            location.assign('/adminpage');
        },1000);
    });
};


//UPDATE HOME PAGE INFO
if(updateHomePageForm)
    updateHomePageForm.addEventListener('submit', e => {
        e.preventDefault();
        if(document.getElementById('photoOne').files[0]!=undefined)
        {
            const photoOneId = document.getElementById('photoOneVal').value;
            const form = new FormData();
            form.append('name',document.getElementById('photoOne').files[0]);
            updateHomePhoto(form, photoOneId);
        }
        if(document.getElementById('photoTwo').files[0]!=undefined)
        {
            const photoTwoId = document.getElementById('photoTwoVal').value;
            const form = new FormData();
            form.append('name', document.getElementById('photoTwo').files[0]);
            updateHomePhoto(form, photoTwoId);
        }
        if(document.getElementById('photoThree').files[0]!=undefined)
        {
            const photoThreeId = document.getElementById('photoThreeVal').value;
            const form = new FormData();
            form.append('name', document.getElementById('photoThree').files[0]);
            updateHomePhoto(form, photoThreeId);
        }
        
        const rushHeading=document.getElementById('headingOne').value;
        const rushParagraph=document.getElementById('paragraphOne').value;
        const aboutHeading=document.getElementById('headingTwo').value;
        const aboutParagraph=document.getElementById('paragraphTwo').value;
        const userOneTitle=document.getElementById('userOneTitle').value;
        const userTwoTitle=document.getElementById('userTwoTitle').value;
        if(userOneId!=null && userTwoId!=null)
        {
            const userOne = userOneId;
            const userTwo = userTwoId;
            updateHomePage({rushHeading,rushParagraph,aboutHeading,aboutParagraph,userOneTitle,userTwoTitle, userOne, userTwo});
        } else if(userOneId!= null && userTwoId==null){
            const userOne = userOneId;
            updateHomePage({rushHeading,rushParagraph,aboutHeading,aboutParagraph,userOneTitle,userTwoTitle, userOne});
        } else if(userOneId==null && userTwoId!=null){
            const userTwo = userTwoId;
            updateHomePage({rushHeading,rushParagraph,aboutHeading,aboutParagraph,userOneTitle,userTwoTitle,userTwo});
        }else {

            updateHomePage({rushHeading,rushParagraph,aboutHeading,aboutParagraph,userOneTitle,userTwoTitle});
        }
    });






//EDIT ABOUT PAGE
var nameDisplayOne = document.getElementById('nameDisplayOne');
var majorDisplayOne = document.getElementById('majorDisplayOne');
var yearDisplayOne = document.getElementById('yearDisplayOne');
var phraseDisplayOne = document.getElementById('favphraseDisplayOne');
var imageDisplayOne = document.querySelector('.imgDisplayOne');

for(var i=0; i<selectUserOneBtn.length; i++) {
    let userOneSelected = document.getElementById(`userOne${i}`).value; //User ID assigned to that button area
    let userOneImg = document.getElementById(`userOneImg${i}`).value; //User Image value

    let userOneName = document.getElementById(`userOneName${i}`).textContent; //User First and Last name
    let userOneMajor = document.getElementById(`userOneMajor${i}`).textContent; //User major
    let userOneYear = document.getElementById(`userOneYear${i}`).textContent; //User year
    let userOneFavPhrase = document.getElementById(`userOneFavPhrase${i}`).textContent; //User phrase

    selectUserOneBtn[i].addEventListener('click',function() {
        document.getElementById('userOneID').value = userOneSelected;
        nameDisplayOne.innerHTML = userOneName;
        majorDisplayOne.innerHTML = userOneMajor;
        yearDisplayOne.innerHTML = userOneYear;
        phraseDisplayOne.innerHTML = userOneFavPhrase;
        imageDisplayOne.setAttribute('src', `/img/users/${userOneImg}`);
        
    });
};

var nameDisplayTwo = document.getElementById('nameDisplayTwo');
var majorDisplayTwo = document.getElementById('majorDisplayTwo');
var yearDisplayTwo = document.getElementById('yearDisplayTwo');
var phraseDisplayTwo = document.getElementById('favphraseDisplayTwo');
var imageDisplayTwo = document.querySelector('.imgDisplayTwo');

for(var i=0; i<selectUserTwoBtn.length; i++) {
    let userTwoSelected = document.getElementById(`userTwo${i}`).value; //User ID assigned to that button area
    let userTwoImg = document.getElementById(`userTwoImg${i}`).value; //User Image value

    let userTwoName = document.getElementById(`userTwoName${i}`).textContent; //User First and Last name
    let userTwoMajor = document.getElementById(`userTwoMajor${i}`).textContent; //User major
    let userTwoYear = document.getElementById(`userTwoYear${i}`).textContent; //User year
    let userTwoFavPhrase = document.getElementById(`userTwoFavPhrase${i}`).textContent; //User phrase

    selectUserTwoBtn[i].addEventListener('click',function() {
        document.getElementById('userTwoID').value = userTwoSelected;
        nameDisplayTwo.innerHTML = userTwoName;
        majorDisplayTwo.innerHTML = userTwoMajor;
        yearDisplayTwo.innerHTML = userTwoYear;
        phraseDisplayTwo.innerHTML = userTwoFavPhrase;
        imageDisplayTwo.setAttribute('src', `/img/users/${userTwoImg}`);
        
    });
};

var nameDisplayThree = document.getElementById('nameDisplayThree');
var majorDisplayThree = document.getElementById('majorDisplayThree');
var yearDisplayThree = document.getElementById('yearDisplayThree');
var phraseDisplayThree = document.getElementById('favphraseDisplayThree');
var imageDisplayThree = document.querySelector('.imgDisplayThree');


for(var i=0; i<selectUserThreeBtn.length; i++) {
    let userThreeSelected = document.getElementById(`userThree${i}`).value; //User ID assigned to that button area
    let userThreeImg = document.getElementById(`userThreeImg${i}`).value; //User Image value

    let userThreeName = document.getElementById(`userThreeName${i}`).textContent; //User First and Last name
    let userThreeMajor = document.getElementById(`userThreeMajor${i}`).textContent; //User major
    let userThreeYear = document.getElementById(`userThreeYear${i}`).textContent; //User year
    let userThreeFavPhrase = document.getElementById(`userThreeFavPhrase${i}`).textContent; //User phrase

    selectUserThreeBtn[i].addEventListener('click',function() {
        document.getElementById('userThreeID').value = userThreeSelected;

        nameDisplayThree.innerHTML = userThreeName;
        majorDisplayThree.innerHTML = userThreeMajor;
        yearDisplayThree.innerHTML = userThreeYear;
        phraseDisplayThree.innerHTML = userThreeFavPhrase;
        imageDisplayThree.setAttribute('src', `/img/users/${userThreeImg}`);
       
    });
};
var nameDisplayFour = document.getElementById('nameDisplayFour');
var majorDisplayFour = document.getElementById('majorDisplayFour');
var yearDisplayFour = document.getElementById('yearDisplayFour');
var phraseDisplayFour = document.getElementById('favphraseDisplayFour');
var imageDisplayFour = document.querySelector('.imgDisplayFour');

for(var i=0; i<selectUserFourBtn.length; i++) {
    let userFourSelected = document.getElementById(`userFour${i}`).value; //User ID assigned to that button area
    let userFourImg = document.getElementById(`userFourImg${i}`).value; //User Image value

    let userFourName = document.getElementById(`userFourName${i}`).textContent; //User First and Last name
    let userFourMajor = document.getElementById(`userFourMajor${i}`).textContent; //User major
    let userFourYear = document.getElementById(`userFourYear${i}`).textContent; //User year
    let userFourFavPhrase = document.getElementById(`userFourFavPhrase${i}`).textContent; //User phrase

    selectUserFourBtn[i].addEventListener('click',function() {
        document.getElementById('userFourID').value = userFourSelected;

        nameDisplayFour.innerHTML = userFourName;
        majorDisplayFour.innerHTML = userFourMajor;
        yearDisplayFour.innerHTML = userFourYear;
        phraseDisplayFour.innerHTML = userFourFavPhrase;
        imageDisplayFour.setAttribute('src', `/img/users/${userFourImg}`);
        
    });
};
var nameDisplayFive = document.getElementById('nameDisplayFive');
var majorDisplayFive = document.getElementById('majorDisplayFive');
var yearDisplayFive = document.getElementById('yearDisplayFive');
var phraseDisplayFive = document.getElementById('favphraseDisplayFive');
var imageDisplayFive = document.querySelector('.imgDisplayFive');

for(var i=0; i<selectUserFiveBtn.length; i++) {
    let userFiveSelected = document.getElementById(`userFive${i}`).value; //User ID assigned to that button area
    let userFiveImg = document.getElementById(`userFiveImg${i}`).value; //User Image value

    let userFiveName = document.getElementById(`userFiveName${i}`).textContent; //User First and Last name
    let userFiveMajor = document.getElementById(`userFiveMajor${i}`).textContent; //User major
    let userFiveYear = document.getElementById(`userFiveYear${i}`).textContent; //User year
    let userFiveFavPhrase = document.getElementById(`userFiveFavPhrase${i}`).textContent; //User phrase

    selectUserFiveBtn[i].addEventListener('click',function() {
        document.getElementById('userFiveID').value = userFiveSelected;

        nameDisplayFive.innerHTML = userFiveName;
        majorDisplayFive.innerHTML = userFiveMajor;
        yearDisplayFive.innerHTML = userFiveYear;
        phraseDisplayFive.innerHTML = userFiveFavPhrase;
        imageDisplayFive.setAttribute('src', `/img/users/${userFiveImg}`);
        
    });
};
var nameDisplaySix = document.getElementById('nameDisplaySix');
var majorDisplaySix = document.getElementById('majorDisplaySix');
var yearDisplaySix = document.getElementById('yearDisplaySix');
var phraseDisplaySix = document.getElementById('favphraseDisplaySix');
var imageDisplaySix = document.querySelector('.imgDisplaySix');

for(var i=0; i<selectUserSixBtn.length; i++) {
    let userSixSelected = document.getElementById(`userSix${i}`).value; //User ID assigned to that button area
    let userSixImg = document.getElementById(`userSixImg${i}`).value; //User Image value

    let userSixName = document.getElementById(`userSixName${i}`).textContent; //User First and Last name
    let userSixMajor = document.getElementById(`userSixMajor${i}`).textContent; //User major
    let userSixYear = document.getElementById(`userSixYear${i}`).textContent; //User year
    let userSixFavPhrase = document.getElementById(`userSixFavPhrase${i}`).textContent; //User phrase

    selectUserSixBtn[i].addEventListener('click',function() {
        document.getElementById('userSixID').value = userSixSelected;

        nameDisplaySix.innerHTML = userSixName;
        majorDisplaySix.innerHTML = userSixMajor;
        yearDisplaySix.innerHTML = userSixYear;
        phraseDisplaySix.innerHTML = userSixFavPhrase;
        imageDisplaySix.setAttribute('src', `/img/users/${userSixImg}`);
        
    });
};
var nameDisplaySeven = document.getElementById('nameDisplaySeven');
var majorDisplaySeven = document.getElementById('majorDisplaySeven');
var yearDisplaySeven = document.getElementById('yearDisplaySeven');
var phraseDisplaySeven = document.getElementById('favphraseDisplaySeven');
var imageDisplaySeven = document.querySelector('.imgDisplaySeven');

for(var i=0; i<selectUserSevenBtn.length; i++) {
    let userSevenSelected = document.getElementById(`userSeven${i}`).value; //User ID assigned to that button area
    let userSevenImg = document.getElementById(`userSevenImg${i}`).value; //User Image value

    let userSevenName = document.getElementById(`userSevenName${i}`).textContent; //User First and Last name
    let userSevenMajor = document.getElementById(`userSevenMajor${i}`).textContent; //User major
    let userSevenYear = document.getElementById(`userSevenYear${i}`).textContent; //User year
    let userSevenFavPhrase = document.getElementById(`userSevenFavPhrase${i}`).textContent; //User phrase

    selectUserSevenBtn[i].addEventListener('click',function() {
        document.getElementById('userSevenID').value = userSevenSelected;

        nameDisplaySeven.innerHTML = userSevenName;
        majorDisplaySeven.innerHTML = userSevenMajor;
        yearDisplaySeven.innerHTML = userSevenYear;
        phraseDisplaySeven.innerHTML = userSevenFavPhrase;
        imageDisplaySeven.setAttribute('src', `/img/users/${userSevenImg}`);
        
    });
};
var nameDisplayEight = document.getElementById('nameDisplayEight');
var majorDisplayEight = document.getElementById('majorDisplayEight');
var yearDisplayEight = document.getElementById('yearDisplayEight');
var phraseDisplayEight = document.getElementById('favphraseDisplayEight');
var imageDisplayEight = document.querySelector('.imgDisplayEight');

for(var i=0; i<selectUserEightBtn.length; i++) {
    let userEightSelected = document.getElementById(`userEight${i}`).value; //User ID assigned to that button area
    let userEightImg = document.getElementById(`userEightImg${i}`).value; //User Image value

    let userEightName = document.getElementById(`userEightName${i}`).textContent; //User First and Last name
    let userEightMajor = document.getElementById(`userEightMajor${i}`).textContent; //User major
    let userEightYear = document.getElementById(`userEightYear${i}`).textContent; //User year
    let userEightFavPhrase = document.getElementById(`userEightFavPhrase${i}`).textContent; //User phrase

    selectUserEightBtn[i].addEventListener('click',function() {
        document.getElementById('userEightID').value = userEightSelected;

        nameDisplayEight.innerHTML = userEightName;
        majorDisplayEight.innerHTML = userEightMajor;
        yearDisplayEight.innerHTML = userEightYear;
        phraseDisplayEight.innerHTML = userEightFavPhrase;
        imageDisplayEight.setAttribute('src', `/img/users/${userEightImg}`);
        
    });
};

const updateAboutPageForm = document.querySelector('.edit-about-page');
if(updateAboutPageForm)
    updateAboutPageForm.addEventListener('submit', e=> {
        e.preventDefault();
        const userOne = document.getElementById('userOneID').value;
        const userTwo = document.getElementById('userTwoID').value;
        const userThree = document.getElementById('userThreeID').value;
        const userFour = document.getElementById('userFourID').value;
        const userFive = document.getElementById('userFiveID').value;
        const userSix = document.getElementById('userSixID').value;
        const userSeven = document.getElementById('userSevenID').value;
        const userEight = document.getElementById('userEightID').value;
        const headingOne = document.getElementById('headingOne').value;
        const paragraphOne = document.getElementById('paragraphOne').value;
        const headingTwo = document.getElementById('headingTwo').value;
        const userOneTitle = document.getElementById('userOneTitle').value;
        const userTwoTitle = document.getElementById('userTwoTitle').value;
        const userThreeTitle = document.getElementById('userThreeTitle').value;
        const userFourTitle = document.getElementById('userFourTitle').value;
        const userFiveTitle = document.getElementById('userFiveTitle').value;
        const userSixTitle = document.getElementById('userSixTitle').value;
        const userSevenTitle = document.getElementById('userSevenTitle').value;
        const userEightTitle = document.getElementById('userEightTitle').value;
        updateAboutPage({headingOne,paragraphOne,headingTwo,userOneTitle,userTwoTitle,userThreeTitle,userFourTitle,userFiveTitle,userSixTitle,userSevenTitle,userEightTitle,userOne,userTwo,userThree,userFour,userFive,userSix,userSeven,userEight});
    });

//DELETE SPECIFIC EVENT PHOTO
const deleteUserBtn = document.querySelectorAll('.deleteUser');
for(var i=0; i<deleteUserBtn.length; i++)
{
    let userID = document.getElementById(`user${i}`).value;
    deleteUserBtn[i].addEventListener('click', function() {
        deleteUser(userID);
    });
}

if(updateRushPageForm)
    updateRushPageForm.addEventListener('submit', e=> {
        e.preventDefault();
        if(document.getElementById('photoOne').files[0]!=undefined)
        {
            const photoOneId = document.getElementById('photoOneVal').value;
            const form = new FormData();
            form.append('name',document.getElementById('photoOne').files[0]);
            updateRushPhoto(form, photoOneId);
        }
        if(document.getElementById('photoTwo').files[0]!=undefined)
        {
            const photoTwoId = document.getElementById('photoTwoVal').value;
            const form = new FormData();
            form.append('name', document.getElementById('photoTwo').files[0]);
            updateRushPhoto(form, photoTwoId);
        }
        const headingOne = document.getElementById('headingOne').value;
        const paragraphOne = document.getElementById('paragraphOne').value;
        const paragraphTwo = document.getElementById('paragraphTwo').value;
        const headingTwo = document.getElementById('headingTwo').value;
        const paragraphThree = document.getElementById('paragraphThree').value;
        const ifcURL = document.getElementById('ifcURL').value;
        const headingThree = document.getElementById('headingThree').value;
        updateRushPage({headingOne,paragraphOne,paragraphTwo,headingTwo,paragraphThree,headingThree,ifcURL});
    });

const deleteMyAccountBtn = document.querySelector('.deleteMyAccount');
if(deleteMyAccountBtn)
    deleteMyAccountBtn.addEventListener('click', e=> {
        e.preventDefault();
        const userID = document.getElementById('apply').value;
        deleteMe();
        logout();
    });