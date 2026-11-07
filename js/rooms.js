/* ===== ROOMS: edit names, prices (PKR per night) and image URLs here ===== */
const IMGURL=id=>"https://images.unsplash.com/photo-"+id+"?auto=format&fit=crop&w=1000&q=80";
/* known-good photos used automatically if a room image fails to load */
const GOOD=["1631049307264-da0ec9d70304","1590490360182-c33d57733427","1582719478250-c89cae4dc85b","1591088398332-8a7791972843","1618221195710-dd6b41faaea6","1566665797739-1674de7a421a"].map(IMGURL);
const ROOMS=[
["r01","Cosy Standard","Standard",9500,2,28,["Wi-Fi","Smart TV"],"BEST VALUE","A calm, compact room with a plush queen bed and everything you need.","1611892440504-42a792e24d32"],
["r02","Standard Twin","Standard",10500,2,30,["Twin beds","Wi-Fi"],"","Two comfortable single beds, ideal for friends and colleagues.","1578683010236-d716f9a3f461"],
["r03","Garden View Room","Standard",11500,2,32,["Garden view","Tea set"],"","Soft light, quiet outlook and a relaxed reading corner.","1595576508898-0ad5c879a061"],
["r04","City Deluxe","Deluxe",14500,2,42,["King bed","City view"],"POPULAR","Warm interiors, a king bed and a panoramic skyline view.",""],
["r05","Deluxe Twin","Deluxe",15500,2,40,["Twin beds","Work desk"],"","Spacious twin layout with a dedicated work desk.","1584132967334-10e028bd69f7"],
["r06","Deluxe Balcony","Deluxe",17000,3,44,["Balcony","Sofa bed"],"","Step out onto your private balcony for morning chai.","1522771739844-6a9f6d5f14af"],
["r07","Sea Breeze Deluxe","Deluxe",18500,2,46,["Corner windows","Bathtub"],"","Bright corner room with a deep soaking tub.","1505693416388-ac5ce068fe85"],
["r08","Executive King","Executive",21000,2,48,["King bed","Lounge access"],"","Refined furnishings and complimentary lounge access.","1540518614846-7eded433c457"],
["r09","Executive Lounge Room","Executive",24000,3,52,["Lounge access","Breakfast"],"","Sitting area, breakfast included and priority service.","1560185007-cde436f6a4d0"],
["r10","Family Comfort","Family",22000,4,56,["2 queen beds","Kids corner"],"FAMILY","Two queen beds and plenty of room for the whole family.","1521783988139-89397d761dce"],
["r11","Family Suite","Family",27500,5,68,["2 bedrooms","Living area"],"","Two connected bedrooms with a private living area.","1551882547-ff40c63fe5fa"],
["r12","Triple Room","Family",19500,3,45,["3 beds","Wi-Fi"],"","A practical three-bed room for small groups.","1618773928121-c32242e63f39"],
["r13","Skyline Suite","Suite",30000,3,58,["Separate lounge","Floor windows"],"","Separate lounge and floor-to-ceiling windows over the city.",""],
["r14","Pool Residence","Suite",36000,3,74,["Private terrace","Plunge pool"],"SIGNATURE","Private terrace, plunge pool and a beautifully appointed suite.",""],
["r15","Honeymoon Suite","Suite",33000,2,64,["Petal turndown","Jacuzzi"],"ROMANTIC","Candlelit evenings, a jacuzzi and a champagne welcome.","1596394516093-501ba68a0ba6"],
["r16","Grand Residence","Suite",42000,4,91,["Private dining","Butler"],"",  "Generous living space, private dining and premium city views.",""],
["r17","Business Suite","Executive",26500,2,55,["Meeting nook","Fast Wi-Fi"],"","A suite built for work, with a meeting nook and fast Wi-Fi.","1564501049412-61c2a3083791"],
["r18","Royal Sky Suite","Premium",55000,4,128,["Highest floor","Sunset lounge"],"PREMIUM","Our highest floor with a private dining room and sunset lounge.",""],
["r19","Presidential Suite","Premium",70000,5,150,["Airport transfer","Personal host"],"","Two bedrooms, a grand salon and a dedicated personal host.","1571896349842-33c89424de2d"],
["r20","Luxe Penthouse","Premium",90000,6,186,["Private chef","Rooftop deck"],"ULTRA LUXURY","A private world above the city with expansive entertaining areas.",""]
].map(([id,name,type,price,guests,size,feat,tag,desc,img],i)=>({id,name,type,price,guests,size,feat,tag,desc,img:img?IMGURL(img):GOOD[[3,12,13,15,17,19].indexOf(i)]}));
