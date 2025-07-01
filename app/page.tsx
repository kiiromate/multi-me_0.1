import HomeClientContent from "./home-client-content"

interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function HomePage({ searchParams }: HomePageProps) {
  return <HomeClientContent />
}