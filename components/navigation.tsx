import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function Navigation() {
  return (
    <header className="px-4 py-5 sm:p-6 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Placeholder */}
        <div className="h-10 w-40 rounded-md bg-gray-300" />
        <nav className="hidden md:block">
          <Button variant="link" className="text-base mr-1" asChild>
            <Link href="/">Login</Link>
          </Button>
          <Button variant="link" className="text-base mr-4" asChild>
            <Link href="/">Sign up</Link>
          </Button>
          <Button className="text-base" asChild>
            <Link href="/">Upload a recipe</Link>
          </Button>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Open nav menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 shadow-md" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/" className="text-base">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/" className="text-base">
                  Sign up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/" className="text-base">
                  Upload a recipe
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
