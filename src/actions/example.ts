'use server';

import { type Result } from '@/types';

/**
 * Example Server Action
 * Use for form submissions and mutations
 */
export async function exampleAction(data: FormData): Promise<Result<string>> {
  try {
    const name = data.get('name') as string;
    
    // Your logic here
    
    return { success: true, data: `Hello, ${name}!` };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error') 
    };
  }
}
