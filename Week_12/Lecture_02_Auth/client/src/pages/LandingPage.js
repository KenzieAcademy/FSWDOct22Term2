import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container className="pt-5">
      <h1 className="mb-5">Full Stack MERN Auth Demonstration</h1>
      <Row className="py-5">
        <Col as="section">
          <h3>What's this all about?</h3>
          <p>
            While it's been a part of Snippets and KenzieCart, we haven't talked
            much about Authorization and Authentication.
            <br />
            The purpose of this live session is to demystify what is arguably
            one of the most challenging yet critical aspects of a robust web
            application.
          </p>
        </Col>
        <Col as="section">
          <h3>Authorization vs Authentication</h3>
          <p>
            Often used interchangeably, Authorization and Authentication are two
            distinct operations.
            <br />
            <code>Authorization</code> - the process of <em>granting access</em>{" "}
            to a requested resource.
            <br />
            <code>Authentication</code> - the process of{" "}
            <em>verifying a user's identity</em>.
          </p>
        </Col>
        <Col as="section">
          <h3>Gimme the TLDR</h3>
          <p>
            <strong>Authentication</strong> involves establishing your identity,
            typically through a sign up process. Then, in any following
            sessions, authentication involves proving your identity by providing
            your account credentials (signing in).
            <br />
            <strong>Authorization</strong> is the process in which the
            application (front end, back end, or, preferably, both) determines
            whether the user requesting a resource is actually allowed to access
            that resource.
          </p>
        </Col>
      </Row>
      <Row as="section" className="my-5">
        <h2>Why not sooner?</h2>
        <p>
          Often times, a team of developers specifically dedicated to the
          security systems involved in Authorization and Authentication will
          spearhead and establish these features. Generally, these developers
          will have a background in cyber-security in some form, as security
          breaches can be devastating to companies small and large.
          <br />
          Additionally, there are a vast sea of options, each with their own
          advantages and disadvantages. With that being said, I encourage you to
          keep an open mind and not take my approach as gospel. Some
          applications will not benefit from these processes, and others will.
          It's also possible that the process covered will suddenly be cracked
          in a matter of days/weeks/months/years and will eventually be
          considered archaic.
        </p>
      </Row>
    </Container>
  );
};

export default LandingPage;
