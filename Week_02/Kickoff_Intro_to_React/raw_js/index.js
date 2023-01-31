function article(title, text) {
  const articleElement = document.createElement("section");

  articleElement.appendChild(h3(title));
  articleElement.appendChild(paragraph(text));

  return articleElement;
}

function h3(title) {
  // Let's make this function take the title, and put it in an h3 tag

  const h3Element = document.createElement("h3");
  h3Element.innerText = title;

  return h3Element;
}

function paragraph(content) {
  const paragraph = document.createElement("p");
  paragraph.innerText = content;

  return paragraph;
}

function landingPage() {
  const page = document.createElement("div");

  page.append(
    article(
      "Hello there!",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nostrum placeat minima architecto, at a voluptatem quasi suscipit corrupti alias ad delectus! Tenetur, earum odit."
    ),
    article(
      "Lebron's latest dilemma",
      "Lebron isn't happy that the refs won't let him win every game without trying, so he cries about it to the media."
    )
  );

  return page;
}

function render(element, root) {
  root.appendChild(element);
}

const target = document.getElementById("root");
render(landingPage(), root);
