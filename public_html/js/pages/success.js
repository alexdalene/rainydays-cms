let redirect_Page = () => {
  let tID = setTimeout(function () {
    window.location.href = "/public_html/index.html";
    window.clearTimeout(tID); // clear time out.
  }, 5000);
};

redirect_Page();
