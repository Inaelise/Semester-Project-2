import { getListings } from "../../api/listing/read";

export async function viewListings() {
  try {
    const listings = await getListings();

    const ul = document.getElementById("list-container");
    ul.innerHTML = "";

    listings.forEach((item) => {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = `/listing/?id=${item.id}`;

      const itemContainer = document.createElement("div");

      const title = document.createElement("h2");
      title.textContent = item.title;

      const img = document.createElement("img");
      if (item.media.length > 0) {
        const selectedImg = item.media[0];
        img.src = selectedImg.url;
        img.alt = selectedImg.alt || "Post image";
      } else {
        img.src = item.media.url;
        img.alt = item.media.alt || "Post image";
      }

      itemContainer.append(img, title);
      link.append(itemContainer);

      listItem.append(link);
      ul.append(listItem);
    });
  } catch (error) {
    //Temporary error alert
    alert(error.message);
  }
}
