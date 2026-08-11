export type ReviewScreenshot = {
  id: string
  src: string
  alt: string
}

// Add a new screenshot by placing it in public/media/reviews and adding one line here.
export const reviewScreenshots: ReviewScreenshot[] = [
  { id: 'review-01', src: '/media/reviews/review-01.jpg', alt: 'צילום מסך של המלצה ממטיילת' },
  { id: 'review-02', src: '/media/reviews/review-02.jpg', alt: 'צילום מסך של המלצה ממטיילת' },
  { id: 'review-03', src: '/media/reviews/review-03.jpg', alt: 'צילום מסך של המלצה ממטיילת' },
  { id: 'review-04', src: '/media/reviews/review-04.jpg', alt: 'צילום מסך של המלצה ממטיילת' },
  { id: 'review-05', src: '/media/reviews/review-05.jpg', alt: 'צילום מסך של המלצה ממטיילת' },
  { id: 'review-06', src: '/media/reviews/review-06.jpg', alt: 'צילום מסך של המלצה ממטיילת' },
]
