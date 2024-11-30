import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import Footer from '../components/Footer';
import { useStateContext } from '../contexts/ContextProvider'


function AppLayout() {

  const { activeMenu } = useStateContext();

    return (
        <div className="grid grid-rows-layout grid-cols-layout min-h-screen min-w-full">


            {/* Sidebar */}
            <aside 
            className={`${activeMenu? 'lg:block': 'hidden'} 
            row-span-full h-screen  col-start-1 col-end-2 sticky top-0 inset-0 z-10 backdrop-blur-sm`}
            
            
            >
                <Sidebar />
            </aside>

            {/* Navbar */}
            <header className={`row-start-1 row-end-2 
              ${activeMenu ? 'col-start-1 lg:col-start-2 col-end-3': 'col-start-1 col-end-3' }
                 border border-green-700`}>
                <Navbar />
            </header>

            {/* Main Content */}
            <main className={`row-start-2
               row-end-3 ${activeMenu ? 'col-start-1 lg:col-start-2 col-end-3': 'col-start-1 col-end-3' }  
               border border-purple-800 md:mt-4 lg:mt-[2rem] large:mt-[5rem] lg:px-4`}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className={`row-start-3 row-end-4 
               ${activeMenu ? 'col-start-1 lg:col-start-2 col-end-3': 'col-start-1 col-end-3 ' }  
              col-end-3 border text-center  py-2`}>
                <Footer/>
            </footer>
        </div>
    );
}

export default AppLayout;
