// Target and create my root node

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);

function Page() {
  return (
    <div>
      <Section>
        <SectionHeading>Hello there</SectionHeading>
        <SectionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nostrum
          placeat minima architecto, at a voluptatem quasi suscipit corrupti
          alias ad delectus! Tenetur, earum odit.
        </SectionContent>
      </Section>
      <Section>
        <SectionHeading> Lebron's latest dilemma</SectionHeading>
        <SectionContent>
          Lebron isn't happy that the refs won't let him win every game without
          trying, so he cries about it to the media.
        </SectionContent>
      </Section>
    </div>
  );
}

// The parameter of a React component function is ALWAYS an object (referred to as props, short for properties)
function SectionHeading(props) {
  return <h3 className="section-heading">{props.children}</h3>;
}

function SectionContent(props) {
  return <p className="flex bold">{props.children}</p>;
}

function Section(props) {
  return <section>{props.children}</section>;
}
