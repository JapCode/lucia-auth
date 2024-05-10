import { validateRequest } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";

const Header = async () => {
  const { user } = await validateRequest();
  // if (!user) {
  //   return redirect("/login");
  // }
  return (
    <header>
      <nav className="fixed overflow-hidden z-20 w-full bg-slate-950 dark:bg-gray-950/0 dark:shadow-md rounded-b-lg dark:shadow-gray-950/10 border-b border-[--ui-light-border-color] border-x dark:border-[--ui-dark-border-color] backdrop-blur-2xl">
        <div className="px-6 m-auto max-w-6xl 2xl:px-0">
          <div className="flex flex-wrap items-center justify-between py-2 sm:py-4">
            <div className="w-full items-center flex justify-between lg:w-auto">
              <Link href="/" aria-label="my logo">
                <Image
                  src="/logo.png"
                  width={30}
                  height={30}
                  alt="icon image"
                  className="object-cover object-center"
                />
              </Link>
              <div className="flex lg:hidden">
                <button
                  aria-label="humburger"
                  id="menu"
                  className="relative border bordeer-gray-950/30 dark:border-white/20 size-9 rounded-full transition duration-300 active:scale-95"
                >
                  <div
                    aria-hidden="true"
                    id="line1"
                    className="m-auto h-[1.5px] w-4 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-1.5 h-[1.5px] w-4 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                  ></div>
                </button>
              </div>
            </div>
            <div className="w-full h-0 lg:w-fit flex-wrap justify-end items-center space-y-8 lg:space-y-0 lg:flex lg:h-fit md:flex-nowrap">
              <div className="mt-6 text-gray-600 dark:text-gray-300 md:-ml-4 lg:pr-4 lg:mt-0">
                <ul className="space-y-6 tracking-wide text-base lg:text-sm lg:flex lg:space-y-0">
                  <li>
                    <Link
                      href="/"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Nothing</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Nothing</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Nothing</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-full space-y-2 gap-2 pt-6 pb-4 lg:pb-0 border-t border-white dark:border-[--ui-dark-border-color] items-center flex flex-col lg:flex-row lg:space-y-0 lg:w-fit lg:border-l lg:border-t-0 lg:pt-0 lg:pl-2">
                {user != null ? (
                  <UserAccountNav user={user} />
                ) : (
                  <>
                    <Link
                      href="sign-in"
                      className={buttonVariants({
                        variant: "secondary",
                      })}
                    >
                      Login
                    </Link>
                    <Link
                      href="sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                        className: "text-white",
                      })}
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
