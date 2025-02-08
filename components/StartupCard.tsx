import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

//defined formatDate() function in utils.ts in /lib
/*<Link href={"/"}>
                    <p className='text-16-medium line clamp-2'>{description}</p>
                </Link>
                <Link href={"/"}>
                    <Image src={image} alt={title} width={150} height={150} className='rounded-1'/>
                </Link>
                <Link href={"/"}>{category}</Link>*/
const StartupCard = ({post} : {post: StartupCardType}) => {
    const { title, description, image, category, views, author:{_id: authorId, name}, _id, createdAt} = post;
    console.log(image);
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium'>{views}</span>
            </div>
        </div>  
        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${authorId}`}>
                    <p className='text-16-medium line clamp-1'>{name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className='text-26-semibold line clamp-1'>{title}</h3>
                </Link>
            </div>

                <Link href={`/user/${authorId}`}>
                    <Image src="https://placehold.co/48x48" alt='user-avatar' width={48} height={48} className='rounded-full'/>
                </Link>
        </div>
        <Link href={`/startup/${_id}`}>
            <p className='startup-card_desc'>{description}</p>
            <img src={image} className='startup-card_img'/>
        </Link>
        <div className='flex-between gap-3 mt-5'>
            <Link href={`/query=${category.toLowerCase()}`}>
                <p className='text-16-medium'>{category}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
                <button className='startup-card_btn'>Details</button>
            </Link>
        </div>
    </li>
  )
}

export default StartupCard
