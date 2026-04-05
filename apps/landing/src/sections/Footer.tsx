'use client'

import { Mic, Twitter, Instagram, Mail } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Templates', 'Guides'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR'],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CloneMyVoice</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Clone your voice with AI. Reply to thousands of fans in your own voice while you sleep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface-light transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface-light transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface-light transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 CloneMyVoice. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with 💜 for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
