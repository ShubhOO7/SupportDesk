
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function TicketItem({ ticket }) {
    const first = new Date().toLocaleDateString();
    const second = new Date(ticket.createdAt).toLocaleDateString();
    const ans = Math.abs(datediff(parseDate(first), parseDate(second)));

    let stat = ('status-new');

    if(ans > 7 ) stat = 'status-open';
    if(ans > 30 ) stat = 'status-closed';


  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status ${stat}`}
    //   style={{width: '50px' , padding: '0px'}}
      >{stat.split("-")[1]}</div>
      <div className=''
      style = {{width: '100%'}} >
        {ticket.description}
      </div>
    </div>
  )
}

export default TicketItem
