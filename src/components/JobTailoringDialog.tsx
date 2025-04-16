
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { JobDescription } from '@/types';
import { Wand2 } from 'lucide-react';

interface JobTailoringDialogProps {
  onTailor: (jobDescription: JobDescription) => void;
}

export function JobTailoringDialog({ onTailor }: JobTailoringDialogProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!jobTitle.trim() || !description.trim()) return;

    // Extract keywords from the job description
    const keywords = description
      .toLowerCase()
      .split(/[\s,\.]+/)
      .filter(word => word.length > 3)
      .slice(0, 10);

    onTailor({
      title: jobTitle,
      description,
      keywords,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wand2 className="h-4 w-4 mr-2" />
          Tailor for Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tailor Portfolio for Job</DialogTitle>
          <DialogDescription>
            Enter the job description to optimize your portfolio content.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={8}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Analyze and Tailor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
