import React from "react";
import { MotionConfig, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import "./Navbar.css"; 



const Navbar = () => {
    return (
        <MotionConfig transition={{ duration: 0.6 }}>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="navbar"
            >
                <div className="navbar-title">
                    <Sparkles className="navbar-icon" />
                    Sentence Tool
                </div>
                <div className="navbar-subtitle">Enhance Your Grammar Skills</div>
            </motion.nav>
        </MotionConfig>
    );
};

export default Navbar;
