export const responses = [
{
  queryId : '6093751693332647',
  response : 'Hello what are you thinking?'
}, {
  queryId : '454795738969918',
  response : 'I will tell you exactly which layout shift is causing it.'
}, {
  queryId : '1705393427088465',
  response : 'If your tooltip is inside the same parent container, when you show it (display: flex), the container height changes → your button shifts → rect.top changes.'
}, {
  queryId : '8832732214663892',
  response : 'These let you apply styles only while the mouse is hovering, and automatically remove them when the mouse leaves.'
}
]


function findMatchingResponse(queryId) {
  let response;
  responses.forEach((responseObject) => {
    if(responseObject.queryId === queryId) {
      response =  responseObject.response;
    }
  });

  return response;
}

export function getResponse(convoId) {
  let matchingId;
  let near;
  responses.forEach((responseObject) => {
    const diff = Math.abs(responseObject.queryId - convoId);
    if(!near) {
      near = diff;
      matchingId = responseObject.queryId;
    } else if (diff < near) {
      near = diff;
      matchingId = responseObject.queryId;
    } else {

    }
  });

  const response = findMatchingResponse(matchingId);
  //console.log(response);
  return response;
  
}