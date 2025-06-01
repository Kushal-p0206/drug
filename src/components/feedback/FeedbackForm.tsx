import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            rating: data.rating,
            comment: data.comment,
          },
        ]);

      if (error) throw error;
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <p className="text-green-600">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label>How satisfied are you with the prescription?</Label>
              <RadioGroup defaultValue="3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={value.toString()}
                      id={`rating-${value}`}
                      {...register('rating')}
                    />
                    <Label htmlFor={`rating-${value}`}>{value} Star{value !== 1 && 's'}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Additional Comments</Label>
              <Textarea
                {...register('comment')}
                placeholder="Please share your thoughts..."
                className="min-h-[100px]"
              />
            </div>
            
            <Button type="submit">Submit Feedback</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}