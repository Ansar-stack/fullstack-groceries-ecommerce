import React from 'react'
import Logo from './navbar/Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full border-t border-t-gray-300 text-gray-600">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <Logo />
                    <p className="mt-6 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h3 className="font-semibold mb-5 text-gray-800">Company</h3>
                        <ul className="text-sm space-y-2">
                            <Link to={'/'} >Home</Link>
                            <Link to={'/about'} >About us</Link>
                            <Link to={'/contact'} >Contact us</Link>
                            <Link to={'/privacy-policy'} >Privacy policy</Link>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-5 text-gray-800">Get in touch</h3>
                        <div className="text-sm space-y-2">
                            <p>+93703634592</p>
                            <p>ansar.stack@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2026 © <a href="/">khanCart</a>. All Right Reserved.
            </p>
        </footer>
    );

}

export default Footer