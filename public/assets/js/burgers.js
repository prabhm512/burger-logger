// Wait until DOM is fully loaded before going into handlers
$(() => {
  $(".submit-btn").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let newBurger = {
      name: $("#name-input").val().trim(),
      devoured: 0, // New burger will always render into 'not tasted' list
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(() => {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // Toggle bw devoured and non devoured state
  $(".change-devoured").on("click", function (event) {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newdevoured");

    let newDevouredState = {
      devoured: newDevoured,
    };

    // Send the PUT request.
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: newDevouredState,
    }).then(() => {
      console.log("changed devoured to", newDevoured);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
