function loadHeader() {

  const header = document.querySelector(".Banner");
  
  // Guard clause to prevent errors if the element doesn't exist
  //if (!header) return; 

  // Clean, multi-line string structure
  const headerContent = `
    <img class="banner_item" id="our_logo" src="/src/assets/index_images/our_logo.jpg" alt="Our Logo">

    <img class="banner_item" id="CS2_logo" src="/src/assets/index_images/CS2_banner.png" style="width: 15%; height: 15%;" alt="CS2 Banner">

    <a class="banner_item" id="login_address" href="/src/Login/login.html">

    <img class="banner_item" id="user_profile" src="/src/assets/index_images/default_profile.png" alt="User Profile">
    
    </a>
  `;

  header.innerHTML = headerContent;
}

loadHeader();

document.addEventListener("DOMContentLoaded", loadHeader);



localStorage.setItem("Test", "ABC");

