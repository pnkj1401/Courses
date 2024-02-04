document.getElementById('resetPasswordButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const securityQuestion = document.getElementById('securityQuestion').value;
    const securityAnswer = document.getElementById('securityAnswer').value;
    const newPassword = document.getElementById('newPassword').value;
  
    const data = {
      username,
      securityQuestion,
      securityAnswer,
      newPassword,
    };
    
    var xhr = new XMLHttpRequest(); 
xhr.open("POST", "/reset-password", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify(data)); 
  });