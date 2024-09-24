 const Title = (props) => {
  const titleStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '5vmin', 
    fontWeight: 'bold',
    color: '#6441A4', 
    textShadow: '0.2em 0.2em 0.4em rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    margin: '2vh 0',
  };
  

  return (
    <div style={titleStyle}>
      {props.beforeSpan}<span style={{ color: '#9146FF' }}>{props.afterSpan}</span>
    </div>
  );
};

export default Title
