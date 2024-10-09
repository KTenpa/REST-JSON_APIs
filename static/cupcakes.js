/* Generates HTML based on a given data about a cupcake */

function generateCupcakeHTML(cupcake) {
    return `
      <div data-cupcake-id=${cupcake.id}>
        <li>
          Flavor: ${cupcake.flavor} | Size: ${cupcake.size} | Rating: ${cupcake.rating}
          <button class="delete-button">X</button>
        </li>
        <img class="Cupcake-img"
              src="${cupcake.image}"
              alt="(no image provided)">
      </div>
    `;
  }


/* Put initial cupcakes on page */

async function showInitialCupcake(){
    const response = await axios.get('api/cupcakes');

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $('#cupcakes-list').append(newCupcake);
    }
}


/* Handle form for adding new cupcakes */

$('#new-cupcake-form').on('submit', async function (evt) {
    evt.preventDefault();

    let flavor = $('#form-flavor').val();
    let rating= $('#form-rating').val();
    let size = $('#form-size').val();
    let image= $('#form-image').val();

    const newCupcakeResponse = await axios.post('api/cupcakes', {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    $('#cupcakes-list').append(newCupcake);
    $('#new-cupcake-form').trigger('reset');
});


/* Handle deleting cupcake */

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    await axios.delete(`api/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showInitialCupcake);