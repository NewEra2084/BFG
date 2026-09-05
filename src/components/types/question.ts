export type Question = {
  question_id: number
  title: string
  score: number
  is_answered: boolean
  tags: string[]
  
  owner: {
    display_name: string
    reputation: number
  }
  link: string
  creation_date: number
  answer_count: number
}

export type Owner = Question["owner"]