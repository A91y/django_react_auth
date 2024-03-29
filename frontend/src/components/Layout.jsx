import { NavLink, Outlet } from "react-router-dom";
import Logout from "./Logout"; // Assuming your Logout component is in a file named Logout.js

export default function Layout() {
   const testMenuItems = [
       {
           href: '/',
           title: 'Home',
       },
       {
           href: 'register',
           title: 'Register',
       },
       {
           href: 'login',
           title: 'Login',
       },
   ];

   const privateMenuItems = [
       {
           href: 'dashboard',
           title: 'Dashboard',
       },
   ];

   return (
       <div className='min-h-screen flex flex-col'>
           <header className='bg-gray-200 text-black sticky top-0 h-14 flex justify-between items-center font-semibold uppercase'>
               <NavLink to="/">Auth</NavLink> 
               <div>
                   <Logout /> 
               </div>
           </header>
           <div className='flex flex-col md:flex-row flex-1'>
               <aside className='bg-gray-100 w-full md:w-60'>
                   <nav>
                       <ul>
                           {testMenuItems.map(({ href, title }) => (
                               <li className='m-2' key={title}>
                                   <NavLink to={href}>
                                       <p className={'text-black'}>{title}</p>
                                   </NavLink>
                               </li>
                           ))}
                           {privateMenuItems.map(({ href, title }) => (
                               <li className='m-2' key={title}>
                                   <NavLink to={href}>
                                       <p className={'text-black'}>{title}</p>
                                   </NavLink>
                               </li>
                           ))}
                       </ul>
                   </nav>
               </aside>
               <main className={'flex-1'}>
                   <Outlet />
               </main>
           </div>
       </div>
   );
}
