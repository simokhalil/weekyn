import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => {
    console.log('bodyRef', bodyRef);
    props.createPdf(bodyRef.current.childNodes[0]);
  };
  return (
    <section className="pdf-container">
      {/* <section className="pdf-toolbar">
        <button onClick={createPdf}>Create PDF</button>
      </section> */}
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}
