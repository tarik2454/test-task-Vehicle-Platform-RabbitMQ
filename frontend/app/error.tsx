// 'use client';

// import { useEffect } from 'react';

// import * as Sentry from '@sentry/nextjs';
// import Image from 'next/image';
// import Link from 'next/link';

// import { Button } from '@/components/ui';

// import { ROUTES } from '@/constants/routes';

// export default function Error({ error }: { error: Error & { digest?: string } }) {
// 	useEffect(() => {
// 		Sentry.captureException(error);
// 	}, [error]);

// 	return (
// 		<div className="relative flex h-full w-full items-center justify-center px-4">
// 			<div className="absolute h-full w-full">
// 				<Image
// 					className="object-cover"
// 					src="/decors/empty-state-bg.png"
// 					alt="empty-state-decor"
// 					fill
// 				/>
// 			</div>
// 			<div className="relative flex flex-col items-center gap-y-8 text-center sm:gap-y-[25px]">
// 				<h1 className="text-4xl font-bold text-neutral-900">Oops! Something went wrong.</h1>
// 				<div className="max-w-[500px] text-xl leading-[26px] font-bold text-neutral-900/75">
// 					Don’t worry! We're working on it. In the meantime, you can head back to the homepage
// 				</div>
// 				<Link href={ROUTES.HOME} className="inline-flex w-full justify-center">
// 					<Button variant="primary" size="lg" className="w-full sm:w-fit">
// 						Go to Home
// 					</Button>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// }
