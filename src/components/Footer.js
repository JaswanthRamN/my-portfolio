'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/constants';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-dark-800/30">
      {/* Glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="container-custom py-14">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Name & Copyright */}
          <div className="text-center md:text-left">
            <p className="font-bold text-white mb-1 text-lg">
              {PERSONAL_INFO.name.split(' ')[0]}
              <span className="gradient-text-static">.</span>
            </p>
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex gap-8 text-sm">
            {[
              { label: 'Work', id: 'projects' },
              { label: 'Skills', id: 'skills' },
              { label: 'Experience', id: 'experience' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: Social Links */}
          <div className="flex gap-3">
            {[
              { href: PERSONAL_INFO.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
              { href: PERSONAL_INFO.github, icon: FaGithub, label: 'GitHub' },
              { href: `mailto:${PERSONAL_INFO.email}`, icon: FaEnvelope, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -2, scale: 1.1 }}
                className="social-icon-btn !w-10 !h-10"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-10 flex justify-center">
          <div className="w-20 h-[2px] rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30" />
        </div>
      </div>
    </footer>
  );
}
