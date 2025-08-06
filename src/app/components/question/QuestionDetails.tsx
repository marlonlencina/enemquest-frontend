import IconButton from "../layout/IconButton";
import SubjectBadge, { SubjectCode } from "../layout/SubjectBadge";
import TextButton from "../layout/TextButton";

interface QuestionDetailsProps {
  title: string;
  questionNumber: string;
  questionId: string;
  subjectCode: SubjectCode;
  actionsDisabled?: boolean;
}

export const QuestionDetails = ({
  title,
  questionNumber,
  questionId,
  subjectCode,
  actionsDisabled = false,
}: QuestionDetailsProps) => {
  return (
    <div className="bg-white-custom rounded-lg p-6 w-full">
      <div className="">
        <h4 className="font-head text-body18 font-semibold text-black-custom">
          {title}
        </h4>
        <h5 className="font-head text-body16 font-semibold text-black-custom mt-4">
          {questionNumber}
        </h5>
        <span className="font-body text-sm12 text-gray-500-custom">
          {questionId}
        </span>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-2 ">
            <SubjectBadge variant="extended" codigo={subjectCode} />
          </div>
        </div>
      </div>
      {!actionsDisabled && (
        <div className="w-full mt-6 flex items-center justify-between ">
          <div className="w-full flex items-center gap-2">
            <IconButton onClick={() => {}} iconName={"mdi:star-outline"} />
            <IconButton onClick={() => {}} iconName={"mdi:share-variant"} />
            <IconButton onClick={() => {}} iconName={"lucide:download"} />
          </div>
          <div className="shrink-0">
            <TextButton onClick={() => {}} text="Adicionar a uma lista" />
          </div>
        </div>
      )}
    </div>
  );
};
