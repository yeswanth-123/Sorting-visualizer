var myarray=[];
var myarray1=[];
var size1=20;
var flag=0;
var timeswap=500;
var timecom=500;
var container = document.getElementById("column1");
container.innerHTML="Give input or randomize array to visualize how sorting works";
function Inputarray()
{
  ResetArray();
  size1=parseInt(prompt("enter number of elements"));
  for(var i=0;i<size1;i++)
  {
     myarray[i]=parseInt(prompt("enter element "+ (i+1) ));
  }
  myarray1=[].concat(myarray);
  container.innerHTML="";
  generatearray();
}
function Randomnumber(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}
function Randomize()
{
    ResetArray();
    container.innerHTML="";
    for(var i=0;i<size1;i++)
    myarray[i]=Math.ceil(Math.random()*100);
    myarray1=[].concat(myarray);
    generatearray();
}
function SameArray()
{
  if(myarray.length==0)
  alert("please enter array or randomize array");
  else
  {
	myarray=[].concat(myarray1);
   container.innerHTML="";
   generatearray();
  }
}
function ResetArray()
{
   size1=40;
  timecom=500;
  container.innerHTML="Give input or randomize array to visualize how sorting works";
  myarray=[];
  myarray1=[];
}
function selected(a)
{
//   document.getElementById("matter").innerHTML="hello";
     if(myarray.length==0)
	 alert("enter array or randomize array");
	 else
	 {
		switch(a)
		{
			case 1:BubbleSort();
			       break;
			case 2:InsertionSort();
			       break;
			case 3:SelectionSort();
			       break;
			case 4:QuickSort(0,myarray.length-1);
			       break;
			default:alert("invalid choice");
			       break;
		}
	 }
}
function clearcontent()
{
  document.getElementById("matter").innerHTML="";
}
async function sleep(timems)
{
	return new Promise((resolve) => setTimeout(() => {resolve(); }, timems));	
}
function generatearray() {
	var len=100/size1+10;
  if(size1<10)
  len=28;
	for (var i = 0; i < size1; i++) {
		var value = myarray[i];
		var array_ele = document.createElement("div");   //creating separate block
		array_ele.classList.add("block");      //Adding class to that block
		array_ele.style.height = `${value *3}px`;  //Adding height to each block
	    array_ele.style.transform = `translate(${i*30}px)`;  //Adding space between blocks
		var array_ele_label = document.createElement("label");  //creating another division to add number
		array_ele_label.classList.add("block_value"); // Adding class to the division
		array_ele_label.innerText = value; // Assigning value to the division
		array_ele.appendChild(array_ele_label); //Adding value to block
		container.appendChild(array_ele); //Adding block to the website
	}
	var myarray2=document.getElementsByClassName("block");   //getting all blocks
	for(var i=0;i<myarray2.length;i++)
	myarray2[i].style.width=(len+"px");           //Assigning width to each block
}
// swap function
function swap(e1,e2,timesend)
{
	return new Promise((resolve)=>{
		setTimeout(()=>{
			      var temp1 = e1.style.height;
				  var temp2 = e1.childNodes[0].innerText;
				  e1.style.height = e2.style.height;
				  e2.style.height = temp1;
				  e1.childNodes[0].innerText = e2.childNodes[0].innerText;
				  e2.childNodes[0].innerText = temp2;
				  resolve();
		},timesend);
	});
}
//BubbleSort Algorithm
async function BubbleSort() {
	var blocks = document.querySelectorAll(".block"); //Getting all blocks
	for (var i = 0; i < blocks.length;i++) 
	{
		for (var j = 0; j < blocks.length - i - 1; j ++)
		 {
			blocks[j].style.backgroundColor = "red";  //Assign colors to comparing elements
			blocks[j + 1].style.backgroundColor = "red";   
			// await new Promise((resolve) => setTimeout(() => {resolve(); }, timecom)); // Comparision delay
			await sleep(timecom);
			var value1 = myarray[j];
			var value2 = myarray[j+1];
			if (value1 > value2)
			 {
      		      [myarray[j],myarray[j+1]]=[myarray[j+1],myarray[j]];   // Swapping values in array
				  await swap(blocks[j],blocks[j+1],300);
				//   await new Promise((resolve) =>setTimeout(() => {resolve(); }, 300));
				  await sleep(300);
			 }
			 blocks[j].style.backgroundColor = "yellow"; //Assigning original color
			 blocks[j + 1].style.backgroundColor = "yellow";
		}
		blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66"; //Assigning color to last element
	}
}
//Insertion sort
async function InsertionSort()
{
	var blocks = document.querySelectorAll(".block");
	blocks[0].style.backgroundColor="#13CE66";
	for(var i=1;i<blocks.length;i++)
	{
		var temp=myarray[i];
		var j=i-1;
		blocks[i].style.backgroundColor="red";
		var height=blocks[i].style.height;
		while( j>=0 && myarray[j]>temp )
		{
			myarray[j+1]=myarray[j];
			blocks[j].style.backgroundColor="red";
			blocks[j+1].style.height=blocks[j].style.height;
			blocks[j+1].childNodes[0].innerHTML=blocks[j].childNodes[0].innerHTML;
			// await new Promise((resolve) =>setTimeout(() => {resolve();}, 500));
			await sleep(500);
			for(var k=i;k>=0;k--)
			blocks[k].style.backgroundColor="#13CE66";
			j--;
		}
		myarray[j+1]=temp;
		blocks[j+1].style.height= height;
		blocks[j+1].childNodes[0].innerHTML=temp;
		// await new Promise((resolve) =>setTimeout(() => {resolve(); }, 200));
		await sleep(200);
		blocks[j+1].style.backgroundColor="#13CE66";
	}
}
//Selection Sort
async function SelectionSort()
{
	var blocks=document.querySelectorAll(".block");
    for(var i=0;i<blocks.length-1;i++)
	{
		var min=i;
		for(var j=i+1;j<blocks.length;j++)
		{
            blocks[min].style.backgroundColor="aqua";
			blocks[j].style.backgroundColor="orange";
            // await new Promise((resolve) =>setTimeout(() => {resolve(); }, 300));
			await sleep(300);
			if(myarray[min]>myarray[j])
			{
		    blocks[min].style.backgroundColor="yellow";
			min=j;
			}
			else
			blocks[j].style.backgroundColor="yellow";
		}
		if(min!=i)
		{
			[myarray[i],myarray[min]]=[myarray[min],myarray[i]];
			await swap(blocks[i],blocks[min],timeswap);
			// await new Promise((resolve) =>setTimeout(() => {resolve(); }, timecom));
			await sleep(timecom);
		}
		blocks[min].style.backgroundColor="yellow";
		blocks[i].style.backgroundColor="#13CE66"
	}
	blocks[blocks.length-1].style.backgroundColor="#13CE66";
}
// Quicksort
async function QuickSort(lb,ub)
{
   if(lb<ub)
   {
	var pos= await Partition(lb,ub);
	await QuickSort(lb,pos-1);
	await QuickSort(pos+1,ub);
   }
   else
   changecolor(lb);
}
function changecolor(i)
{
	var blocks=document.querySelectorAll(".block");
	blocks[i].style.backgroundColor="#13CE66"
}
//Partition Function
async function Partition(lb,ub)
{
	 var blocks=document.querySelectorAll(".block");
     var pivot=lb,start=lb,end=ub;
	 for(var i=lb;i<=ub;i++)
     blocks[i].style.backgroundColor="pink";
	 blocks[start].style.backgroundColor="blue";
	 blocks[end].style.backgroundColor="aqua";
	//  blocks[pivot].style.backgroundColor="red";
	 while(start<end)
	 {
         while(myarray[start]<=myarray[pivot])
		 {
			if(start>ub)
			break;
			blocks[start].style.backgroundColor="pink";
			start++;
			if(start>ub)
			{
				blocks[start-1].style.backgroundColor="pink";
				break;
			}
			blocks[start].style.backgroundColor="blue";
			// await new Promise((resolve) =>setTimeout(() => {resolve(); }, timecom)); 
			await sleep(timecom);
		 }
		 while(myarray[end]>myarray[pivot] )
		 {
			blocks[end].style.backgroundColor="pink";
            end--;
			if(end<lb)
			{
				blocks[end+1].style.backgroundColor="pink";
				break;
			}
			blocks[end].style.backgroundColor="aqua";
			// await new Promise((resolve) =>setTimeout(() => {resolve(); }, timecom));
			await sleep(timecom);
		 }
		 if(start<end)
		 {
             [myarray[start],myarray[end]]=[myarray[end],myarray[start]];
			 swap(blocks[start],blocks[end],300);
			//  await new Promise((resolve) =>setTimeout(() => {resolve(); }, timecom));
			await sleep(timecom);
		 }
	 }
	 [myarray[pivot],myarray[end]]=[myarray[end],myarray[pivot]];
	 swap(blocks[pivot],blocks[end],300);
	 for(var i=lb;i<=ub;i++)
	 blocks[i].style.backgroundColor="yellow";
	 blocks[end].style.backgroundColor="#13CE66";
	 return end;
}
// async function MergeSort(lb,ub)
// {
//     if(lb<ub)
// 	{
// 		var mid=(lb+ub)/2;
// 		await MergeSort(lb,mid);
// 		await MergeSort(mid+1,ub);
// 		await Merge(lb,mid,ub);
// 	}
// }
// async function Merge(lb,mid,ub)
// {
	
// }

//bucket sort
//Radix sort
