import { Button } from '../ui/button.js'

export function Header() {
  return `
    <header class="max-w-[96%] mx-auto bg-card/20 fixed top-4 inset-x-0 rounded-full p-1">
      <div class="flex justify-between items-center">

        <div class="flex items-center gap-4">

          <a href="/" class="text-xl font-bold bg-white/42 rounded-full">
            <img src="/parvaz-logo.png" class="w-30 h-20" />
          </a>

          <nav class="flex gap-6">
            <a href="#home">پرواز داخلی</a>
            <a href="#about">پرواز خارجی</a>
            <a href="#contact">تور</a>
            <a href="#contact">اقامت</a>
            <a href="#contact">وبلاگ</a>
            <a href="#contact">درباره ما</a>
            <a href="#contact">ارتباط با ما</a>
            <a href="#contact">پیگیری خرید</a>
          </nav>

        </div>

        ${Button({
          children: `
            <i data-lucide="badge-dollar-sign"></i>
            <span>IRR</span>
          `,
          variant: 'outline',
        })}

      </div>
    </header>
  `
}
