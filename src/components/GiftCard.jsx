import Timer from "./Timer";


export default function GiftCard({
  gift,
  opened,
  locked,
  onOpen
}) {


if(locked){

return (

<div className="gift locked">

<h2>
🔒 {gift.title}
</h2>


<p>
Этот гостинец пока спрятан
</p>

</div>

)

}



return (

<div className="gift">


<img
src={gift.image}
/>


<h2>
{gift.title}
</h2>


<p>
{gift.description}
</p>


{
opened ?

<div className="opened">

✨ гостинец открыт ❤️

</div>


:

<button onClick={onOpen}>

🎁 Открыть гостинец

</button>

}


</div>

)

}