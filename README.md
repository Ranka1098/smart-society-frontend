# title => smart society

# features

1. create building ya join the building

- admin create building
- create building deatail form
- admin-name , ph-number
- building name
- building address
- area pincode
- locality
- submit
  after submit it reture building unique code for specific building
- this code use and join the building

# task

1. register page UI sucessfully

   1. admin building page UI from created sucessfully
   2. join society member Ui form created sucessfully

2. Routing created

- createBrowserRouter function using routing created
- Navbar component created - left side => logo - middle => society Name - right side => user icon

3. dashboard created

   1. leftSideDashBoard Created
      - menu shows => flat,shop,Maintenance,Expences,Complaint
   2. RightSideDashBoard Created
      - menu shows =>Total Members,Total Flats,Total Shops,Total Collection,Maintenance Amount,Total Expense

4. pages created

   - pages =>Home,Flat,Shop,Maintenence,Expence,Complaint

5. Home page component

   - showing Top Side navbar Component
   - left side showing LeftSideBarDashBoard componet
   - right side showing Outlet
   - Oulet jo routing ke children ke ander aayega wo outlet me show hoga.

6. children created in outlet

   - routing ccreated in App.jsx page
   - in children
   - index position showing RightSideBarDashBoard
   - then all pages jo link se render honge

7. flat page created

   - give heading - flat detai
   - show flat info
   - 1. Total Flats
   - 2. Owner Flats
   - 3. Rented Flats
   - show 3 fillter button - all , Owner , Rent
   - filter button according to list of all flats

8. flat person detail page created
   - flat id
   - resident type
     - owner / Rented
   - person full name
   - person phone numer
   - person kab se reh raha hai
   - person family detail
   - total men
   - total women
   - total kids
